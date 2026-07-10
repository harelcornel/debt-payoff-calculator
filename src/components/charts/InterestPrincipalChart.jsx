import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function InterestPrincipalChart({
  debts,
  result,
}) {
  if (!debts.length || !result) {
    return null;
  }

  const principal = debts.reduce(
    (sum, debt) => sum + debt.balance,
    0
  );

  const data = [
    {
      name: "Principal",
      amount: principal,
    },
    {
      name: "Interest",
      amount: result.totalInterest,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Principal vs Interest
        </CardTitle>
      </CardHeader>

      <CardContent>

        <div className="h-[350px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart data={data}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

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

              <Bar
                dataKey="amount"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </CardContent>
    </Card>
  );
}