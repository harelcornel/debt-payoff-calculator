import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

function formatMoney(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function ResultCard({ result }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Payoff Results</CardTitle>
      </CardHeader>

      <CardContent>
        {!result ? (
          <div className="flex h-64 items-center justify-center text-center text-muted-foreground">
            <div>
              <p className="text-lg font-medium">
                No calculation yet
              </p>

              <p className="mt-2 text-sm">
                Choose a strategy and click
                <br />
                <strong>Calculate Payoff</strong>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Strategy
              </span>

              <span className="font-semibold">
                {result.strategy}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Total Debts
              </span>

              <span className="font-semibold">
                {result.totalDebts}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Extra Monthly Payment
              </span>

              <span className="font-semibold">
                {formatMoney(result.extraPayment)}
              </span>
            </div>

            <hr />

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Estimated Payoff
              </span>

              <span className="text-xl font-bold">
                {result.months} months
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Total Interest
              </span>

              <span className="font-semibold">
                {formatMoney(result.totalInterest)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Debt Free Date
              </span>

              <span className="font-semibold">
                {result.payoffDate}
              </span>
            </div>

          </div>
        )}
      </CardContent>
    </Card>
  );
}