"use client"

import { createContext, useContext } from "react"
import { Tooltip, TooltipProps } from "recharts"

export type ChartConfig = {
  [key: string]: {
    label: string
    color: string
  }
}

const ChartContext = createContext<ChartConfig | null>(null)

interface ChartContainerProps {
  config: ChartConfig
  children: React.ReactNode
}

export function ChartContainer({ config, children }: ChartContainerProps) {
  return (
    <ChartContext.Provider value={config}>{children}</ChartContext.Provider>
  )
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: any[]
  label?: string
  indicator?: "line" | "dashed"
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  indicator = "line",
}: ChartTooltipContentProps) {
  const config = useContext(ChartContext)
  if (!active || !payload?.length || !config) return null

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
        <div className="grid gap-1">
          {payload.map((item: any, i: number) => {
            const configKey = Object.keys(config).find(
              (key) => key === item.dataKey
            )
            if (!configKey) return null
            return (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: config[configKey].color }}
                />
                <span className="text-sm font-medium">
                  {config[configKey].label}:
                </span>
                <span className="text-sm text-muted-foreground">
                  {item.value}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function ChartTooltip(props: TooltipProps<any, any>) {
  return <Tooltip {...props} />
}
