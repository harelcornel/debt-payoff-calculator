export function formatCurrency(value) {
  if (!value) return "";

  return Number(value).toLocaleString();
}

export function calculateFirstMonth(
  loanAmount,
  interestRate,
  monthlyPayment
) {
  const loan = Number(loanAmount);
  const interest = Number(interestRate) / 100;
  const payment = Number(monthlyPayment);

  if (!loan || !interest || !payment) {
    return null;
  }

  const firstMonthInterest = loan * interest;
  const principalPaid = payment - firstMonthInterest;
  const remainingBalance = loan - principalPaid;

  return {
    firstMonthInterest,
    principalPaid,
    remainingBalance,
  };
}