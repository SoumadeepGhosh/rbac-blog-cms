// components/dashboard/ContentPieChart.tsx
"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  data: { name: string; value: number }[];
}

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981"];

function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  const item = payload[0];

  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-popover-foreground">{item.name}</p>

      <p className="text-muted-foreground">{item.value}</p>
    </div>
  );
}

export default function ContentPieChart({ data }: Props) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Content breakdown
        </CardTitle>

        <CardDescription>Posts, categories and comments</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
               <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={95}
                paddingAngle={3}
                stroke="hsl(var(--card))"
                strokeWidth={2}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 space-y-3">
          {data.map((item, index) => {
            const percent =
              total > 0 ? Math.round((item.value / total) * 100) : 0;

            return (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />

                  <span className="text-sm text-foreground">{item.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{item.value}</span>

                  <span className="w-10 text-right text-xs text-muted-foreground">
                    {percent}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
