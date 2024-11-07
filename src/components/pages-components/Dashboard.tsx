"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Calendar as CalendarIcon, TrendingUp } from "lucide-react";
import React from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useSession } from "next-auth/react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ClientChart from "@/components/ui/client-chart";

// Move these configurations to the top, after imports
const chartConfig = {
  desktop: {
    color: "#3DC2EC",
    label: "Desktop"
  },
  mobile: {
    color: "#EB3678",
    label: "Mobile"
  }
};


const chartData = [
  { month: "Jan", desktop: 1500, mobile: 900 },
  { month: "Feb", desktop: 2300, mobile: 1200 },
  { month: "Mar", desktop: 3200, mobile: 1800 },
  { month: "Apr", desktop: 2800, mobile: 1600 },
  { month: "May", desktop: 2000, mobile: 1300 },
  { month: "Jun", desktop: 2600, mobile: 1400 }
];

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

interface TabContent {
  title: string;
  description: string;
  content: React.ReactNode;
}

const tabContents: TabContent[] = [
  {
    title: "Overview",
    description: "View your overall performance and key metrics",
    content: (
      <div className="grid gap-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <span className="text-muted-foreground text-xs">$45,231.89</span>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
              <span className="text-muted-foreground">+2350</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <span className="text-muted-foreground">+12,234</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <span className="text-muted-foreground">+573</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+201 since last hour</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                  <ClientChart chartData={chartData} />
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none text-white">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-2xl">Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-8 pt-4">
                {recentSales.map((sale, index) => (
                  <li key={index} className="flex items-center justify-center">
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
    )
  },
  {
    title: "Analytics",
    description: "Detailed analysis of your business metrics",
    content: (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Track your user acquisition and retention metrics
            </p>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    title: "Reports",
    description: "Generate and view detailed reports",
    content: (
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View and download your monthly performance reports
            </p>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    title: "Notifications",
    description: "Manage your notification preferences",
    content: (
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Configure your notification preferences and alerts
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }
];


export default function Dashboard() {
  const [data, setData] = React.useState(monthlyData);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: new Date(2023, 1, 9),
  }); 

  const {data:session} = useSession();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
                className="dark"
              />
            </PopoverContent>
          </Popover>
          <Button className="w-full sm:w-auto">Download</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          {tabContents.map((tab) => (
            <TabsTrigger 
              key={tab.title.toLowerCase()} 
              value={tab.title.toLowerCase()}
              className="whitespace-nowrap"
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabContents.map((tab) => (
          <TabsContent 
            key={tab.title.toLowerCase()} 
            value={tab.title.toLowerCase()}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{tab.title}</h2>
                <p className="text-muted-foreground">{tab.description}</p>
              </div>
            </div>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}