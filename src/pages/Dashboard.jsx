import AppLayout from "../components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { motion } from "motion/react";
import { useState } from "react";
import DebtList from "../components/debts/DebtList";
import AddDebtDialog from "../components/debts/AddDebtDialog";
import useDebts from "../hooks/useDebts";


export default function Dashboard() {
const [open, setOpen] = useState(false);

const {
  debts,
  addDebt,
  deleteDebt,
  updateDebt,
  totalDebt,
  totalMinimum,
  averageApr,
} = useDebts();

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
      <AppLayout
        onAddDebt={() => setOpen(true)}
      >
      <div className="mx-auto max-w-7xl space-y-8 p-8">

        {/* Header */}
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
              transition={{ delay: index * 0.1 }}
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

        {/* Debt List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Debts</CardTitle>
          </CardHeader>

          <CardContent>
            <DebtList
              debts={debts}
              onDelete={deleteDebt}
            />
          </CardContent>
        </Card>

        {/* Bottom Section */}
        <div className="grid gap-6 lg:grid-cols-2">

          <Card>
            <CardHeader>
              <CardTitle>Payoff Strategy</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="h-52 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground">
                Strategy Controls
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="h-52 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground">
                Payoff Results
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
      <AddDebtDialog
        open={open}
        onOpenChange={setOpen}
        onSave={addDebt}
      />
    </AppLayout>
  );
}