"use client";

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Bell, ChevronDown, Search, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const monthlyData = [
  { month: "Jan", value: 1500 },
  { month: "Feb", value: 4500 },
  { month: "Mar", value: 4800 },
  { month: "Apr", value: 4200 },
  { month: "May", value: 3000 },
  { month: "Jun", value: 4000 },
  { month: "Jul", value: 2000 },
  { month: "Aug", value: 4800 },
  { month: "Sep", value: 2500 },
  { month: "Oct", value: 1500 },
  { month: "Nov", value: 4500 },
  { month: "Dec", value: 4800 },
];

const recentSales = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
  { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" },
];

export default function Dashboard() {
  const [data, setData] = React.useState(monthlyData);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <div className="flex items-center gap-2">
            <Image src="/placeholder.svg" alt="Avatar" className="rounded-full" width={32} height={32} />
            <span className="font-semibold">Alicia Koch</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          <nav className="flex items-center gap-4 ml-4">
            <Link href="#" className="text-sm font-medium text-primary">Overview</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground">Customers</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground">Products</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground">Settings</Link>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8 w-64" />
            </div>
            <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>
      <div className="flex-1 space-y-4 p-4 md:p-8 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline">Jan 20, 2023 - Feb 09, 2023</Button>
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <span className="text-muted-foreground">$45,231.89</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          {/* Additional cards as in original code */}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} axisLine={false} tickLine={false} />
                    <YAxis stroke="#888888" fontSize={12} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #ddd" }} />
                    <Bar dataKey="value" fill="#3a86ff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentSales.map((sale, index) => (
                  <li key={index} className="flex items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                      <span className="font-medium">{sale.name[0]}</span>
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{sale.name}</p>
                      <p className="text-sm text-muted-foreground">{sale.email}</p>
                    </div>
                    <div className="ml-auto font-medium">{sale.amount}</div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
