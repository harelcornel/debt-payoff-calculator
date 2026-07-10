import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Badge } from "../ui/badge";
import { Trophy } from "lucide-react";

function money(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function StrategyComparison({
  avalanche,
  snowball,
}) {
  if (!avalanche || !snowball) return null;

  const winner =
    avalanche.totalInterest <= snowball.totalInterest
      ? "avalanche"
      : "snowball";

  const saved = Math.abs(
    avalanche.totalInterest -
      snowball.totalInterest
  );

  return (
    <Card className="mt-8">

      <CardHeader>

        <div className="flex items-center gap-2">

          <Trophy className="h-5 w-5 text-yellow-500" />

          <CardTitle>
            Strategy Comparison
          </CardTitle>

        </div>

      </CardHeader>

      <CardContent>

        <div className="grid gap-6 md:grid-cols-2">

          <Card
            className={
              winner === "avalanche"
                ? "border-green-500"
                : ""
            }
          >
            <CardContent className="p-6 space-y-3">

              <div className="flex items-center justify-between">

                <h3 className="font-bold">
                  🏔 Avalanche
                </h3>

                {winner === "avalanche" && (
                  <Badge>
                    Best
                  </Badge>
                )}

              </div>

              <p>
                <strong>
                  {avalanche.months}
                </strong>{" "}
                months
              </p>

              <p>
                {money(
                  avalanche.totalInterest
                )}
              </p>

            </CardContent>
          </Card>

          <Card
            className={
              winner === "snowball"
                ? "border-green-500"
                : ""
            }
          >
            <CardContent className="p-6 space-y-3">

              <div className="flex items-center justify-between">

                <h3 className="font-bold">
                  ❄️ Snowball
                </h3>

                {winner === "snowball" && (
                  <Badge>
                    Best
                  </Badge>
                )}

              </div>

              <p>
                <strong>
                  {snowball.months}
                </strong>{" "}
                months
              </p>

              <p>
                {money(
                  snowball.totalInterest
                )}
              </p>

            </CardContent>
          </Card>

        </div>

        <div className="mt-6 rounded-lg bg-muted p-4">

          <p className="font-medium">

            💡 Using{" "}

            <strong>
              {winner === "avalanche"
                ? "Debt Avalanche"
                : "Debt Snowball"}
            </strong>

            {" "}saves approximately{" "}

            <strong>
              {money(saved)}
            </strong>

            {" "}in interest.

          </p>

        </div>

      </CardContent>

    </Card>
  );
}