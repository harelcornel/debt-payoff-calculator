import { useState } from "react";
import DebtSummary from "./DebtSummary";
import PaymentTable from "./PaymentTable";
import {
  formatCurrency,
  calculatePayoffSchedule,
} from "../utils/calculations";
import ResultCard from "./ResultCard";

function LoanForm() {
  // =========================
  // State
  // =========================
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState("");

  // =========================
  // Event Handlers
  // =========================
  const handleCalculate = () => {
  const result = calculatePayoffSchedule(
    loanAmount,
    interestRate,
    monthlyPayment
  );

  if (result === null) {
    setError("Monthly payment must be greater than the monthly interest.");
    setSchedule([]);
    return;
  }

  setError("");
  setSchedule(result);
};

  return (
    <main>
      <h2>Loan Information</h2>

      <div className="form-group">
        <label htmlFor="loan">Loan Amount</label>
        <input
          id="loan"
          type="number"
          placeholder="200000"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="interest">Monthly Interest (%)</label>
        <input
          id="interest"
          type="number"
          placeholder="3"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="payment">Monthly Payment</label>
        <input
          id="payment"
          type="number"
          placeholder="30000"
          value={monthlyPayment}
          onChange={(e) => setMonthlyPayment(e.target.value)}
        />
      </div>

      <button
        onClick={handleCalculate}
        disabled={!loanAmount || !interestRate || !monthlyPayment}
        >
          Calculate Schedule 🚀
      </button>

      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}
      <DebtSummary
        schedule={schedule}
        loanAmount={loanAmount}
      />
      <PaymentTable schedule={schedule} />

    </main>
  );
}

export default LoanForm;