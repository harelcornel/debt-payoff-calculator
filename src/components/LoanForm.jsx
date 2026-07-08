import { useState } from "react";
import {
  formatCurrency,
  calculateFirstMonth,
} from "../utils/calculations";
import ResultCard from "./ResultCard";

function LoanForm() {
  // =========================
  // State
  // =========================
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [result, setResult] = useState(null);

  // =========================
  // Event Handlers
  // =========================
  const handleCalculate = () => {
    const calculation = calculateFirstMonth(
      loanAmount,
      interestRate,
      monthlyPayment
    );

    if (!calculation) {
      alert("Please fill in all fields.");
      return;
    }

    setResult(calculation);
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

      <button onClick={handleCalculate}>
        Calculate
      </button>

      <ResultCard
        loanAmount={loanAmount}
        interestRate={interestRate}
        monthlyPayment={monthlyPayment}
        result={result}
      />

    </main>
  );
}

export default LoanForm;