import Header from "./Header";

export default function AppLayout({
  children,
  onAddDebt,
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header onAddDebt={onAddDebt} />

      <main>{children}</main>
    </div>
  );
}