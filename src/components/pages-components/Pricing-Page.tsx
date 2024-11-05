'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Check } from "lucide-react";

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

const loadRazorpayScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function PricingPage() {

  const handlePayment = async (amount: number) => {
    const isRazorpayLoaded = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!isRazorpayLoaded) {
      alert("Failed to load Razorpay. Please try again.");
      return;
    }

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }), // amount in the smallest currency unit (e.g., 100 for ₹1)
      });

      const orderData: RazorpayOrderResponse = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: orderData.amount.toString(),
        currency: orderData.currency,
        name: "Your Plan",
        image: "/logo.png",
        description: "Get your SaaS kit for one-time payment",
        order_id: orderData.id,
        handler: function (response: any) {
          alert("Payment successful!");
        },
        prefill: {
          name: "Your Name",
          email: "email@example.com",
          contact: "1234567890",
        },
        theme: {
          color: "#1E201E"
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error during payment", error);
      alert("There was an error initiating the payment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-[url('/gb.png')] bg-center bg-cover">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center flex-col flex justify-center items-center">
          <h2 className="text-base font-semibold">Pricing</h2>
          <h1 className="mt-3 text-4xl py-3 font-bold lg:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent text-center dark:from-white dark:via-gray-200 dark:to-gray-400">Simple pricing for everyone.</h1>
          <p className="md:max-w-xl max-w-[375px] mt-5 px-3 bio text-[14px] lg:text-[18px]">
            Choose an <span className="font-semibold">affordable plan</span> that's packed with the best features for engaging your audience, creating customer loyalty, and driving sales.
          </p>
        </div>

        <div className="mt-8 flex justify-center items-center gap-3">
          <span>Annual</span>
          <Switch />
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-amber-500/10 text-amber-500">
            2 MONTHS FREE 🎉
          </span>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-4 lg:gap-8">
          {[
            {
              title: "Basic",
              description: "A basic plan for startups and individual users",
              price: 84000,
              features: [
                "AI-powered analytics",
                "Basic support",
                "5 projects limit",
                "Access to basic AI tools"
              ]
            },
            {
              title: "Premium",
              description: "A premium plan for growing businesses",
              price: 168200,
              features: [
                "Advanced AI insights",
                "Priority support",
                "Unlimited projects",
                "Access to all AI tools",
                "Custom integrations"
              ],
              highlight: true
            },
            {
              title: "Enterprise",
              description: "An enterprise plan with advanced features for large organizations",
              price: 252400,
              features: [
                "Custom AI solutions",
                "24/7 dedicated support",
                "Unlimited projects",
                "Access to all AI tools",
                "Custom integrations",
                "Data security and compliance"
              ]
            },
            {
              title: "Ultimate",
              description: "The ultimate plan with all features for industry leaders",
              price: 336500,
              features: [
                "Bespoke AI development",
                "White-glove support",
                "Unlimited projects",
                "Priority access to new AI tools",
                "Custom integrations",
                "Highest data security and compliance"
              ]
            }
          ].map((plan) => (
            <Card 
              key={plan.title}
              className={`relative bg-zinc-900 border-zinc-800 ${plan.highlight ? 'border-amber-500/50' : ''}`}
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{plan.title}</CardTitle>
                <p className="text-sm text-zinc-400">{plan.description}</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">₹{plan.price / 100}</span>
                  <span className="ml-1 text-zinc-400">one time</span>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-white text-black hover:bg-zinc-200"
                  onClick={() => handlePayment(plan.price)}
                >
                  Subscribe
                </Button>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}