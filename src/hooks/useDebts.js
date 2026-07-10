import { useEffect, useState } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "debt-payoff-calculator";

const sampleDebts = [
  {
    id: 1,
    name: "Credit Card",
    balance: 185000,
    interestType: "apr",
    interestRate: 24,
    minimum: 5500,
  },
  {
    id: 2,
    name: "Personal Loan",
    balance: 95000,
    interestType: "apr",
    interestRate: 12,
    minimum: 3200,
  },
  {
    id: 3,
    name: "Car Loan",
    balance: 420000,
    interestType: "apr",
    interestRate: 7,
    minimum: 9800,
  },
];

export default function useDebts() {
  const [debts, setDebts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return sampleDebts;
    }

    try {
      return JSON.parse(saved);
    } catch {
      return sampleDebts;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(debts)
    );
  }, [debts]);

  function addDebt(newDebt) {
    setDebts((current) => [...current, newDebt]);

    toast.success("Debt Added", {
      description: `${newDebt.name} was added successfully.`,
    });
  }

  function updateDebt(updatedDebt) {
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

  function deleteDebt(id) {
    const debt = debts.find((d) => d.id === id);

    setDebts((current) =>
      current.filter((debt) => debt.id !== id)
    );

    toast.success("Debt Deleted", {
      description: debt
        ? `${debt.name} was removed.`
        : "Debt removed.",
    });
  }

  function clearDebts() {
    setDebts([]);

    toast.success("All Debts Cleared");
  }

  const totalDebt = debts.reduce(
    (sum, debt) => sum + Number(debt.balance),
    0
  );

  const totalMinimum = debts.reduce(
    (sum, debt) => sum + Number(debt.minimum),
    0
  );

      const averageApr =
        debts.length === 0
          ? 0
          : debts.reduce((sum, debt) => {

              const rate =
                debt.interestRate ??
                debt.apr ??
                0;

              const annualRate =
                debt.interestType === "monthly"
                  ? rate * 12
                  : rate;

              return sum + annualRate;

            }, 0) / debts.length;

  return {
    debts,

    addDebt,
    updateDebt,
    deleteDebt,
    clearDebts,

    totalDebt,
    totalMinimum,
    averageApr,
  };
}