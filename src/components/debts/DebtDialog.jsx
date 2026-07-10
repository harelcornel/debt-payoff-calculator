import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function DebtDialog({
  open,
  onOpenChange,
  debt,
  onSubmit,
}) {
  const emptyForm = {
    name: "",
    balance: "",
    interestType: "monthly",
    interestRate: "",
    minimum: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (debt) {
      setForm({
        name: debt.name,
        balance: debt.balance,

        // Backward compatibility
        interestType: debt.interestType ?? "monthly",
        interestRate:
          debt.interestRate ??
          debt.apr ??
          "",

        minimum: debt.minimum,
      });
    } else {
      setForm(emptyForm);
    }
  }, [debt, open]);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit() {
    if (
      !form.name ||
      !form.balance ||
      !form.interestRate ||
      !form.minimum
    ) {
      return;
    }

    onSubmit({
      id: debt?.id ?? Date.now(),

      name: form.name,

      balance: Number(form.balance),

      interestType: form.interestType,

      interestRate: Number(
        form.interestRate
      ),

      minimum: Number(form.minimum),
    });

    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>
          <DialogTitle>
            {debt
              ? "Edit Debt"
              : "Add New Debt"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">

          <div className="space-y-2">
            <Label>Debt Name</Label>

            <Input
              name="name"
              placeholder="Credit Card"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Balance</Label>

            <Input
              name="balance"
              type="number"
              value={form.balance}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">

            <Label>Interest Type</Label>

            <select
              name="interestType"
              value={form.interestType}
              onChange={handleChange}
              className="w-full rounded-md border bg-background px-3 py-2"
            >
              <option value="monthly">
                Monthly Interest
              </option>

              <option value="apr">
                Annual APR
              </option>

            </select>

          </div>

          <div className="space-y-2">

            <Label>
              {form.interestType ===
              "monthly"
                ? "Monthly Interest (%)"
                : "Annual APR (%)"}
            </Label>

            <Input
              name="interestRate"
              type="number"
              placeholder={
                form.interestType ===
                "monthly"
                  ? "2.5"
                  : "24"
              }
              value={form.interestRate}
              onChange={handleChange}
            />

          </div>

          <div className="space-y-2">

            <Label>
              Minimum Monthly Payment
            </Label>

            <Input
              name="minimum"
              type="number"
              value={form.minimum}
              onChange={handleChange}
            />

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button onClick={handleSubmit}>
            {debt
              ? "Update Debt"
              : "Save Debt"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}