function cloneDebts(debts) {
  return debts.map((debt) => ({
    id: debt.id,
    name: debt.name,

    balance: Number(debt.balance),

    minimum: Number(debt.minimum),

    interestType:
      debt.interestType ?? "apr",

    interestRate: Number(
      debt.interestRate ??
      debt.apr ??
      0
    ),

    originalBalance: Number(
      debt.balance
    ),

    paidOffMonth: null,
  }));
}

function annualRate(debt) {
  return debt.interestType === "monthly"
    ? debt.interestRate * 12
    : debt.interestRate;
}

function monthlyRate(debt) {
  return debt.interestType === "monthly"
    ? debt.interestRate / 100
    : debt.interestRate / 100 / 12;
}

function sortDebts(
  debts,
  strategy
) {
  const sorted = [...debts];

  if (strategy === "snowball") {
    sorted.sort((a, b) => {
      if (a.balance !== b.balance) {
        return a.balance - b.balance;
      }

      return annualRate(b) - annualRate(a);
    });
  } else {
    sorted.sort((a, b) => {
      if (
        annualRate(a) !==
        annualRate(b)
      ) {
        return (
          annualRate(b) -
          annualRate(a)
        );
      }

      return a.balance - b.balance;
    });
  }

  return sorted;
}

function activeDebts(debts) {
  return debts.filter(
    (d) => d.balance > 0.01
  );
}

export function simulatePayoff(
  debts,
  strategy,
  extraPayment = 0
) {
  const working = sortDebts(
    cloneDebts(debts),
    strategy
  );

  const timeline = [];

  let month = 0;

  let totalInterest = 0;

  while (
    activeDebts(working).length &&
    month < 600
  ) {
    month++;

    // Apply interest

    for (const debt of working) {
      if (debt.balance <= 0) continue;

      const interest =
        debt.balance *
        monthlyRate(debt);

      debt.balance += interest;

      totalInterest += interest;
    }

    let extra =
      Number(extraPayment) || 0;

    const ordered =
      sortDebts(
        activeDebts(working),
        strategy
      );

    for (const debt of ordered) {
      if (debt.balance <= 0)
        continue;

      let payment =
        debt.minimum;

      if (
        debt.id === ordered[0].id
      ) {
        payment += extra;
      }

      if (
        payment >
        debt.balance
      ) {
        payment =
          debt.balance;
      }

      debt.balance -= payment;

      if (
        debt.balance <= 0.01
      ) {
        debt.balance = 0;

        debt.paidOffMonth =
          month;

        extra += debt.minimum;
      }
    }

    timeline.push({
      month,

      balances: working.map(
        (debt) => ({
          id: debt.id,

          name: debt.name,

          balance: Number(
            debt.balance.toFixed(
              2
            )
          ),

          originalBalance:
            debt.originalBalance,

          progress:
            debt.originalBalance ===
            0
              ? 1
              : 1 -
                debt.balance /
                  debt.originalBalance,
        })
      ),

      activeDebts:
        activeDebts(working)
          .length,
    });

      }

  const payoffDate = new Date();

  payoffDate.setMonth(
    payoffDate.getMonth() + month
  );

  const totalPrincipal = working.reduce(
    (sum, debt) =>
      sum + debt.originalBalance,
    0
  );

  const totalPaid =
    totalPrincipal + totalInterest;

  return {
    months: month,

    totalInterest: Number(
      totalInterest.toFixed(2)
    ),

    totalPaid: Number(
      totalPaid.toFixed(2)
    ),

    payoffDate,

    debts: working.map((debt) => ({
      id: debt.id,

      name: debt.name,

      balance: Number(
        debt.balance.toFixed(2)
      ),

      minimum: debt.minimum,

      interestType:
        debt.interestType,

      interestRate:
        debt.interestRate,

      originalBalance:
        debt.originalBalance,

      paidOffMonth:
        debt.paidOffMonth,
    })),

    timeline,
  };
}