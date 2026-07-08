import { formatCurrency } from "../utils/calculations";

function ResultCard({
  loanAmount,
  interestRate,
  monthlyPayment,
  result,
}) {
  if (!result) return null;

  return (
    <div className="result-card">
      <h3>Debt Summary</h3>

      <p>
        <strong>Loan Amount:</strong> ₱
        {formatCurrency(loanAmount)}
      </p>

      <p>
        <strong>Interest Rate:</strong> {interestRate}%
      </p>

      <p>
        <strong>Monthly Payment:</strong> ₱
        {formatCurrency(monthlyPayment)}
      </p>

      <hr />

      <p>
        <strong>First Month Interest:</strong> ₱
        {formatCurrency(result.firstMonthInterest)}
      </p>

      <p>
        <strong>Principal Paid:</strong> ₱
        {formatCurrency(result.principalPaid)}
      </p>

      <p>
        <strong>Remaining Balance:</strong> ₱
        {formatCurrency(result.remainingBalance)}
      </p>
    </div>
  );
}

export default ResultCard;