export function formatCurrency(value) {
  if (value === "" || value === null || value === undefined) return "";

  return Number(value).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function calculateFirstMonth(
  loanAmount,
  interestRate,
  monthlyPayment
) 
{
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
export function calculatePayoffSchedule(
  loanAmount,
  interestRate,
  monthlyPayment
  
) 
{
  const schedule = [];

  let balance = Number(loanAmount);
  let month = 1;

  const rate = Number(interestRate) / 100;
  const payment = Number(monthlyPayment);

  while (balance > 0) {
    const interest = Number((balance * rate).toFixed(2));
let principal = payment - interest;

// Payment is too small to reduce the balance
if (principal <= 0) {
  return null;
}

// Prevent overpaying the last month
if (principal > balance) {
  principal = balance;
}

    balance = Number((balance - principal).toFixed(2));

    schedule.push({
      month,
      interest,
      principal,
      balance: balance < 0 ? 0 : balance,
    });

    month++;

    // Safety check to prevent infinite loops
    if (month > 1000) break;
  }

  return schedule;
}

