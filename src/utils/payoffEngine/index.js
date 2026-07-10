import { simulatePayoff } from "./helpers";

export function calculatePayoff(
  debts,
  strategy = "avalanche",
  extraPayment = 0
) {
  if (!debts || debts.length === 0) {
    return null;
  }

  const simulation = simulatePayoff(
    debts,
    strategy,
    extraPayment
  );

  return {
    strategy,
    months: simulation.months,
    totalInterest: simulation.totalInterest,
    payoffDate: simulation.payoffDate,
    timeline: simulation.timeline,
    debts: simulation.debts,
  };
}