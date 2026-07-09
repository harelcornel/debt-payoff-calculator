import { useEffect, useState } from "react";

const STORAGE_KEY = "debt-payoff-calculator";

const sampleDebts = [
  {
    id: 1,
    name: "Credit Card",
    balance: 185000,
    apr: 24,
    minimum: 5500,
  },
  {
    id: 2,
    name: "Personal Loan",
    balance: 95000,
    apr: 12,
    minimum: 3200,
  },
  {
    id: 3,
    name: "Car Loan",
    balance: 420000,
    apr: 7,
    minimum: 9800,
  },
];

export default function useDebts() {
  const [debts, setDebts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return sampleDebts;
      }
    }

    return sampleDebts;
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(debts)
    );
  }, [debts]);

  function addDebt(newDebt) {
    setDebts((current) => [...current, newDebt]);
  }

  function deleteDebt(id) {
    setDebts((current) =>
      current.filter((debt) => debt.id !== id)
    );
  }

  function updateDebt(updatedDebt) {
    setDebts((current) =>
      current.map((debt) =>
        debt.id === updatedDebt.id ? updatedDebt : debt
      )
    );
  }

  function clearDebts() {
    setDebts([]);
  }

  const totalDebt = debts.reduce(
    (sum, debt) => sum + debt.balance,
    0
  );

  const totalMinimum = debts.reduce(
    (sum, debt) => sum + debt.minimum,
    0
  );

  const averageApr =
    debts.length > 0
      ? debts.reduce((sum, debt) => sum + debt.apr, 0) /
        debts.length
      : 0;

  return {
    debts,

    addDebt,
    deleteDebt,
    updateDebt,
    clearDebts,

    totalDebt,
    totalMinimum,
    averageApr,
  };
}