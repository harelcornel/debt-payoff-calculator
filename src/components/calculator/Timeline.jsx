import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Badge } from "../ui/badge";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Timeline({ timeline }) {
  if (!timeline || timeline.length === 0) {
    return null;
  }

  // Show first 24 months
  const months = timeline.slice(0, 24);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Payoff Timeline</CardTitle>

        <p className="text-sm text-muted-foreground">
          Showing the first {months.length} months
        </p>
      </CardHeader>

      <CardContent className="max-h-[700px] space-y-8 overflow-y-auto">

        {months.map((month) => (
          <div
            key={month.month}
            className="rounded-xl border bg-card p-6 shadow-sm"
          >

            <div className="mb-6 flex items-center justify-between">

              <h3 className="text-lg font-bold">
                Month {month.month}
              </h3>

              <Badge variant="secondary">
                {month.activeDebts} Active
              </Badge>

            </div>

            <div className="space-y-6">

              {month.balances.map((debt) => {

                const progress = Math.max(
                  0,
                  Math.min(100, debt.progress * 100)
                );

                const paidOff = debt.balance <= 0;

                return (
                  <div key={debt.id}>

                    <div className="mb-2 flex items-center justify-between">

                      <div>

                        <p className="font-medium">
                          {debt.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(debt.balance)}
                        </p>

                      </div>

                      <div className="text-right">

                        {paidOff ? (
                          <Badge>
                            Paid Off 🎉
                          </Badge>
                        ) : (
                          <span className="text-sm font-semibold">
                            {progress.toFixed(0)}%
                          </span>
                        )}

                      </div>

                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-muted">

                      <div
                        className={`h-full transition-all duration-700 ${
                          paidOff
                            ? "bg-green-500"
                            : "bg-primary"
                        }`}
                        style={{
                          width: `${progress}%`,
                        }}
                      />

                    </div>

                  </div>
                );
              })}

            </div>

          </div>
        ))}

      </CardContent>
    </Card>
  );
}