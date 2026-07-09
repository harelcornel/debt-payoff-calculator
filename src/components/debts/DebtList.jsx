import DebtCard from "./DebtCard";

export default function DebtList({
  debts,
  onEdit,
  onDelete,
}) {
  if (debts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        No debts yet.

        <p className="mt-2 text-sm">
          Click "Add Debt" to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {debts.map((debt) => (
        <DebtCard
          key={debt.id}
          debt={debt}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}