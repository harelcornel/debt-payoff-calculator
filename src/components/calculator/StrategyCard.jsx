import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function StrategyCard({
  debts,
  onCalculate,
}) {
  const [strategy, setStrategy] = useState("avalanche");
  const [extraPayment, setExtraPayment] = useState("");

  const totalMinimum = debts.reduce(
    (sum, debt) => sum + debt.minimum,
    0
  );

  const totalBalance = debts.reduce(
    (sum, debt) => sum + debt.balance,
    0
  );

  const averageApr =
    debts.length > 0
      ? debts.reduce((sum, debt) => {
          const rate =
            debt.interestRate ??
            debt.apr ??
            0;

          const annualRate =
            debt.interestType === "monthly"
              ? rate * 12
              : rate;

          return sum + annualRate;
        }, 0) / debts.length
      : 0;

  function handleCalculate() {
    onCalculate({
      strategy,
      extraPayment: Number(extraPayment) || 0,
    });
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Payoff Strategy</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        <div className="space-y-3">

          <Label>Strategy</Label>

          <div className="grid grid-cols-2 gap-3">

            <button
              onClick={() => setStrategy("avalanche")}
              className={`rounded-lg border p-4 text-left transition ${
                strategy === "avalanche"
                  ? "border-primary bg-primary/10"
                  : "hover:bg-muted"
              }`}
            >
              <p className="font-semibold">
                Avalanche
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Highest interest first
              </p>

            </button>

            <button
              onClick={() => setStrategy("snowball")}
              className={`rounded-lg border p-4 text-left transition ${
                strategy === "snowball"
                  ? "border-primary bg-primary/10"
                  : "hover:bg-muted"
              }`}
            >
              <p className="font-semibold">
                Snowball
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Lowest balance first
              </p>

            </button>

          </div>

        </div>

        <div className="space-y-2">

          <Label>
            Extra Monthly Payment
          </Label>

          <Input
            type="number"
            placeholder="5000"
            value={extraPayment}
            onChange={(e) =>
              setExtraPayment(e.target.value)
            }
          />

        </div>

        <div className="rounded-lg border bg-muted/30 p-4">

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span>Total Debt</span>

              <strong>
                ₱{totalBalance.toLocaleString()}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Monthly Minimum</span>

              <strong>
                ₱{totalMinimum.toLocaleString()}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Average APR</span>

              <strong>
                {averageApr.toFixed(2)}%
              </strong>
            </div>

          </div>

        </div>

        <Button
          className="w-full"
          disabled={!debts.length}
          onClick={handleCalculate}
        >
          Calculate Payoff
        </Button>

      </CardContent>

    </Card>
  );
}