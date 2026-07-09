import { useState } from "react";

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

export default function AddDebtDialog({
  open,
  onOpenChange,
  onSave,
}) {
  const [form, setForm] = useState({
    name: "",
    balance: "",
    apr: "",
    minimum: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSave() {
    if (
      !form.name ||
      !form.balance ||
      !form.apr ||
      !form.minimum
    ) {
      return;
    }

    onSave({
      id: Date.now(),
      name: form.name,
      balance: Number(form.balance),
      apr: Number(form.apr),
      minimum: Number(form.minimum),
    });

    setForm({
      name: "",
      balance: "",
      apr: "",
      minimum: "",
    });

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Debt</DialogTitle>
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
              placeholder="185000"
              value={form.balance}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>APR (%)</Label>

            <Input
              name="apr"
              type="number"
              placeholder="24"
              value={form.apr}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Minimum Monthly Payment</Label>

            <Input
              name="minimum"
              type="number"
              placeholder="5500"
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

          <Button onClick={handleSave}>
            Save Debt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}