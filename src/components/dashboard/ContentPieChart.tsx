"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  {
    name: "Posts",
    value: 42,
  },
  {
    name: "Categories",
    value: 8,
  },
  {
    name: "Comments",
    value: 120,
  },
];

const COLORS = [
  "#2563eb",
  "#8b5cf6",
  "#22c55e",
];

export default function ContentPieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Content Breakdown
        </CardTitle>

        <CardDescription>
          Posts, Categories & Comments
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-[320px] w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}