"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, ResponsiveContainer, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Sample data structure for 24-hour clicks
const generateHourlyData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? `0${i}:00` : `${i}:00`
    return {
      hour,
      twitter: Math.floor(Math.random() * 50),
      youtube: Math.floor(Math.random() * 50),
      instagram: Math.floor(Math.random() * 50),
      github: Math.floor(Math.random() * 50),
      linkedin: Math.floor(Math.random() * 50),
    }
  })
  return hours
}

const socialConfig = {
  twitter: {
    label: "Twitter",
    color: "#1DA1F2",
  },
  youtube: {
    label: "YouTube",
    color: "#FF0000",
  },
  instagram: {
    label: "Instagram",
    color: "#E4405F",
  },
  github: {
    label: "GitHub",
    color: "#333333",
  },
  linkedin: {
    label: "LinkedIn",
    color: "#0A66C2",
  },
}

// Add this type if you don't have it
type TooltipData = {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
    payload: {
      hour: string
      [key: string]: number | string
    }
  }>
  label?: string
}

export function SocialMediaGraphs() {
  const chartData = generateHourlyData()
  
  const calculateTotalAndTrend = (platform: keyof typeof socialConfig) => {
    const total = chartData.reduce((sum, hour) => sum + hour[platform], 0)
    const firstHalf = chartData.slice(0, 12).reduce((sum, hour) => sum + hour[platform], 0)
    const secondHalf = chartData.slice(12).reduce((sum, hour) => sum + hour[platform], 0)
    const trend = ((secondHalf - firstHalf) / firstHalf) * 100
    return { total, trend }
  }

  const CustomTooltip = ({ active, payload, label }: TooltipData) => {
    if (!active || !payload?.length) return null;
    
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Time
            </span>
            <span className="font-bold text-sm">{label}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Clicks
            </span>
            <span className="font-bold text-sm">{payload[0].value}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:max-w-[1000px] md:max-w-[650px] max-w-[340px] px-6 py-6">
      {Object.entries(socialConfig).map(([platform, config]) => {
        const { total, trend } = calculateTotalAndTrend(platform as keyof typeof socialConfig)
        const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown

        return (
          <Card key={platform} className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {config.label}
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: config.color }}
                />
              </CardTitle>
              <CardDescription>Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="hour" 
                      tickFormatter={(value) => value.split(':')[0]}
                      interval={3}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey={platform}
                      stroke={config.color}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: config.color }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                {trend >= 0 ? 'Up' : 'Down'} by {Math.abs(trend).toFixed(1)}%
                <TrendIcon 
                  className="h-4 w-4" 
                  style={{ color: trend >= 0 ? 'green' : 'red' }}
                />
              </div>
              <div className="leading-none text-muted-foreground">
                Total clicks: {total}
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
