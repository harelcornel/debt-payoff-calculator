import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function DebtBalanceChart({
  timeline,
}) {
  if (!timeline || timeline.length === 0) {
    return null;
  }

  const chartData = timeline.map((month) => ({
    month: month.month,

    balance: month.balances.reduce(
      (sum, debt) => sum + debt.balance,
      0
    ),
  }));

  return (
    <Card className="mt-8">

      <CardHeader>
        <CardTitle>
          Remaining Debt Balance
        </CardTitle>
      </CardHeader>

      <CardContent>

        <div className="h-[350px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
              />

              <YAxis
                tickFormatter={(value) =>
                  `₱${(
                    value / 1000
                  ).toFixed(0)}k`
                }
              />

              <Tooltip
                formatter={(value) =>
                  formatCurrency(value)
                }
              />

              <Line
                type="monotone"
                dataKey="balance"
                strokeWidth={3}
                dot={false}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </CardContent>

    </Card>
  );
}