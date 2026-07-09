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
    apr: "",
    minimum: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (debt) {
      setForm({
        name: debt.name,
        balance: debt.balance,
        apr: debt.apr,
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
      !form.apr ||
      !form.minimum
    ) {
      return;
    }

    onSubmit({
      id: debt?.id ?? Date.now(),
      name: form.name,
      balance: Number(form.balance),
      apr: Number(form.apr),
      minimum: Number(form.minimum),
    });

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>
          <DialogTitle>
            {debt ? "Edit Debt" : "Add New Debt"}
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
            <Label>APR (%)</Label>

            <Input
              name="apr"
              type="number"
              value={form.apr}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Minimum Monthly Payment</Label>

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
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button onClick={handleSubmit}>
            {debt ? "Update Debt" : "Save Debt"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}