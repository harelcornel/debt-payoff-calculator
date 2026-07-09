import { formatCurrency } from "../utils/calculations";

function DebtSummary({ schedule, loanAmount }) {
  if (schedule.length === 0) return null;

  const totalMonths = schedule.length;

  const totalInterest = schedule.reduce(
    (sum, payment) => sum + payment.interest,
    0
  );

  const totalPaid = Number(loanAmount) + totalInterest;

  const finalBalance = schedule[schedule.length - 1].balance;

  return (
    <div className="summary-card">
      <h3>📊 Debt Summary</h3>

      <div className="summary-grid">
        <div>
          <span>Months to Payoff</span>
          <strong>{totalMonths}</strong>
        </div>

        <div>
          <span>Total Interest</span>
          <strong>₱{formatCurrency(totalInterest)}</strong>
        </div>

        <div>
          <span>Total Paid</span>
          <strong>₱{formatCurrency(totalPaid)}</strong>
        </div>

        <div>
          <span>Final Balance</span>
          <strong>₱{formatCurrency(finalBalance)}</strong>
        </div>
      </div>
    </div>
  );
}

export default DebtSummary;