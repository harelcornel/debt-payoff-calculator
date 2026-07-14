import { useState } from "react";
import { motion } from "motion/react";
import { calculatePayoff } from "../utils/payoffEngine";
import AppLayout from "../components/layout/AppLayout";
import StrategyCard from "../components/calculator/StrategyCard";
import ResultCard from "../components/calculator/ResultCard";
import Timeline from "../components/calculator/Timeline";
import DebtList from "../components/debts/DebtList";
import DebtDialog from "../components/debts/DebtDialog";
import useDebts from "../hooks/useDebts";
import DebtBalanceChart from "../components/charts/DebtBalanceChart";
import DebtDistributionChart from "../components/charts/DebtDistributionChart";
import InterestPrincipalChart from "../components/charts/InterestPrincipalChart";
import StrategyComparison from "../components/calculator/StrategyComparison";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";


export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [result, setResult] = useState(null);

  const {
    debts,
    addDebt,
    updateDebt,
    deleteDebt,
    totalDebt,
    totalMinimum,
    averageApr,
  } = useDebts();

  function handleAddClick() {
    setSelectedDebt(null);
    setOpen(true);
  }

  function handleEdit(debt) {
    setSelectedDebt(debt);
    setOpen(true);
  }

  function handleSubmit(debt) {
    if (selectedDebt) {
      updateDebt(debt);
    } else {
      addDebt(debt);
    }

    setSelectedDebt(null);
    setOpen(false);
  }

function handleCalculate(data) {
const avalanche = calculatePayoff(
  debts,
  "avalanche",
  data.extraPayment
);

const snowball = calculatePayoff(
  debts,
  "snowball",
  data.extraPayment
);

const calculation =
  data.strategy === "avalanche"
    ? avalanche
    : snowball;

  if (!calculation) return;

  setResult({
    strategy:
      data.strategy === "avalanche"
        ? "Debt Avalanche"
        : "Debt Snowball",

    extraPayment: data.extraPayment,

    totalDebts: debts.length,

    months: calculation.months,

    totalInterest: calculation.totalInterest,

    payoffDate:
      calculation.payoffDate.toLocaleDateString(),

    timeline: calculation.timeline,
    avalanche,
    snowball,
  });
}

  const summaryCards = [
    {
      title: "Total Debt",
      value: `₱${totalDebt.toLocaleString()}`,
    },
    {
      title: "Monthly Minimum",
      value: `₱${totalMinimum.toLocaleString()}`,
    },
    {
      title: "Average APR",
      value: `${averageApr.toFixed(1)}%`,
    },
    {
      title: "Total Accounts",
      value: debts.length,
    },
  ];

  return (
    <AppLayout onAddDebt={handleAddClick}>
      <div className="mx-auto max-w-7xl space-y-8 p-8">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your debts and simulate payoff strategies.
          </p>
        </motion.div>

        {/* Summary */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">
                    {card.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    {card.value}
                  </h2>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        {/* Debts */}
        <Card>
          <CardHeader>
            <CardTitle>Your Debts</CardTitle>
          </CardHeader>

          <CardContent>
            <DebtList
              debts={debts}
              onEdit={handleEdit}
              onDelete={deleteDebt}
            />
          </CardContent>
        </Card>

        {/* Calculator */}
          <div className="grid gap-6 lg:grid-cols-2">

            <StrategyCard
              debts={debts}
              onCalculate={handleCalculate}
            />

            <ResultCard
              result={result}
            />

          </div>

          {result && (
            <StrategyComparison
              avalanche={result.avalanche}
              snowball={result.snowball}
            />
          )}

        {result && (
        <>
        <div className="grid gap-6 lg:grid-cols-3">

          <DebtBalanceChart
            timeline={result.timeline}
          />

          <DebtDistributionChart
            debts={debts}
          />

          <InterestPrincipalChart
            debts={debts}
            result={result}
          />

        </div>

          <Timeline
            timeline={result.timeline}
          />
        </>
        )}

      </div>

      <DebtDialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            setSelectedDebt(null);
          }
        }}
        debt={selectedDebt}
        onSubmit={handleSubmit}
      />
    </AppLayout>
  );
}

function updateDebt(updatedDebt) {
  console.log("UPDATE CALLED", updatedDebt);

  setDebts((current) =>
    current.map((debt) =>
      debt.id === updatedDebt.id
        ? updatedDebt
        : debt
    )
  );

  toast.success("Debt Updated", {
    description: `${updatedDebt.name} has been updated.`,
  });
}