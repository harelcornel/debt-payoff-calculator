import { formatCurrency } from "../utils/calculations";

function PaymentTable({ schedule }) {
  if (schedule.length === 0) return null;

  return (
    <div className="result-card">
      <h3>Payment Schedule</h3>

      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Interest</th>
            <th>Principal</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>
          {schedule.map((payment) => (
            <tr key={payment.month}>
              <td>{payment.month}</td>

              <td>
                ₱{formatCurrency(payment.interest)}
              </td>

              <td>
                ₱{formatCurrency(payment.principal)}
              </td>

              <td>
                ₱{formatCurrency(payment.balance)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentTable;