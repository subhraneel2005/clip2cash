'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const loadRazorpayScript = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
};

interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const { id } = useParams();
  const [currency, setCurrency] = useState<'USD' | 'INR'>('INR');
  const [priceINR, setPriceINR] = useState<number | null>(null);
  const [priceUSD, setPriceUSD] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const planData = {
      basic: { priceINR: 840, priceUSD: 10, title: "Basic" },
      premium: { priceINR: 1682, priceUSD: 20, title: "Premium" },
      enterprise: { priceINR: 2524, priceUSD: 30, title: "Enterprise" },
      ultimate: { priceINR: 3365, priceUSD: 40, title: "Ultimate" },
    };

    const plan = planData[id as keyof typeof planData];
    if (plan) {
      setPriceINR(plan.priceINR);
      setPriceUSD(plan.priceUSD);
      setPrice(currency === "INR" ? plan.priceINR : plan.priceUSD);
    } else {
      alert("Invalid plan selected.");
    }
  }, [id, currency]);

  const handleCurrencyChange = (value: string) => {
    setCurrency(value as 'USD' | 'INR');
    setPrice(value === "INR" ? priceINR : priceUSD);
  };

  const handlePayment = async () => {
    if (!priceUSD || !priceINR) {
      alert("Prices are not yet loaded. Please try again in a moment.");
      return;
    }

    const isRazorpayLoaded = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!isRazorpayLoaded) {
      alert("Failed to load Razorpay. Please try again.");
      return;
    }

    try {

      const amount = currency === "USD" ? priceUSD * 100 : priceINR * 100;

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency }),
      });

      if (!response.ok) throw new Error("Failed to create order");

      const orderData: RazorpayOrderResponse = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: orderData.amount.toString(),
        currency: orderData.currency,
        name: `${id} Plan`,
        image: "/logo.png",
        description: "Get your SaaS kit for a one-time payment",
        order_id: orderData.id,
        handler: function (response: any) {
          alert("Payment successful!");
          console.log("Payment Details:", response);
        },
        prefill: {
          name: "Your Name",
          email: "email@example.com",
          contact: "1234567890",
        },
        theme: {
          color: "#1E201E",
        },
        // Add the display_currency and display_amount to properly handle USD display
        display_currency: currency,
        display_amount: (currency === "USD" ? priceUSD : priceINR).toString(),
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error during payment", error);
      alert("There was an error initiating the payment. Please try again.");
    }
  };

  return price !== null ? (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-6xl w-full h-full overflow-hidden flex flex-col md:flex-row">
        <div className="flex flex-col md:flex-row h-full gap-8 justify-center items-center">
          <div className="md:w-1/2 relative h-full">
            <Image
              width={700}
              height={700}
              src="/getstart-mac.jpg"
              alt="Getkit product image"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-between h-full">
            <div>
              <h1 className="text-3xl font-bold mb-2">Checkout for {id} Plan</h1>
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold">
                  {currency === 'USD' ? `$${priceUSD}` : `₹${priceINR}`}
                </span>
                <Select onValueChange={handleCurrencyChange} value={currency}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full" size="lg" onClick={handlePayment}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-center mt-4">Loading...</p>
  );
};

export default CheckoutPage;
