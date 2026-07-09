import DebtCard from "./DebtCard";

export default function DebtList({
  debts,
  onEdit,
  onDelete,
}) {
  if (debts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        <h3 className="text-lg font-semibold">
          No debts yet
        </h3>

        <p className="mt-2 text-sm">
          Click <span className="font-medium">"Add Debt"</span> to get started.
        </p>
      </div>
    );
  }

  const totalDebt = debts.reduce(
    (sum, debt) => sum + debt.balance,
    0
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {debts.map((debt) => (
        <DebtCard
          key={debt.id}
          debt={debt}
          totalDebt={totalDebt}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}