import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <div>
          <h1 className="text-lg font-semibold">
            Debt Payoff Calculator
          </h1>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Debt
        </Button>
      </div>
    </header>
  );
}