import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function DebtDistributionChart({
  debts,
}) {
  if (!debts.length) return null;

  const data = debts.map((debt) => ({
    name: debt.name,
    value: debt.balance,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Debt Distribution</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) =>
                  formatCurrency(value)
                }
              />

              <Legend />

            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}