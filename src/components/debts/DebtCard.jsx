import { motion } from "motion/react";

import {
  CreditCard,
  Car,
  Landmark,
  GraduationCap,
  Wallet,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function getDebtIcon(name) {
  const value = name.toLowerCase();

  if (value.includes("credit"))
    return <CreditCard className="h-5 w-5" />;

  if (value.includes("car"))
    return <Car className="h-5 w-5" />;

  if (value.includes("student"))
    return <GraduationCap className="h-5 w-5" />;

  if (value.includes("mortgage"))
    return <Landmark className="h-5 w-5" />;

  return <Wallet className="h-5 w-5" />;
}

function getAprBadge(apr) {
  if (apr >= 20)
    return {
      text: "High APR",
      className:
        "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    };

  if (apr >= 10)
    return {
      text: "Medium APR",
      className:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    };

  return {
    text: "Low APR",
    className:
      "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  };
}

export default function DebtCard({
  debt,
  totalDebt,
  onEdit,
  onDelete,
}) {
  const badge = getAprBadge(debt.apr);

  const percentage =
    totalDebt > 0
      ? (debt.balance / totalDebt) * 100
      : 0;

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-xl transition-all">
        <CardContent className="p-6">

          <div className="flex items-start justify-between">

            <div className="space-y-2">

              <div className="flex items-center gap-2">

                {getDebtIcon(debt.name)}

                <h3 className="font-semibold text-lg">
                  {debt.name}
                </h3>

              </div>

              <Badge className={badge.className}>
                {badge.text}
              </Badge>

            </div>

            <DropdownMenu>

              <DropdownMenuTrigger
                className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent"
              >
                <MoreHorizontal className="h-5 w-5" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">

                <DropdownMenuItem
                  onClick={() => onEdit?.(debt)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onDelete?.(debt.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>

          </div>

          <div className="mt-8 grid grid-cols-2 gap-8">

            <div>

              <p className="text-sm text-muted-foreground">
                Current Balance
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                ₱{debt.balance.toLocaleString()}
              </h2>

            </div>

            <div>

              <p className="text-sm text-muted-foreground">
                Minimum Payment
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                ₱{debt.minimum.toLocaleString()}
              </h2>

            </div>

          </div>

          <div className="mt-8 space-y-2">

            <div className="flex justify-between text-sm text-muted-foreground">

              <span>Share of Total Debt</span>

              <span>
                {percentage.toFixed(1)}%
              </span>

            </div>

            <Progress value={percentage} />

          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}