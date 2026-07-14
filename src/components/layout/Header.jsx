import { Button } from "../ui/button";
import { Plus, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header({ onAddDebt }) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">

        <div>
            <h1 className="text-xl font-bold tracking-tight">
              Debt Pilot
            </h1>
        </div>

        <div className="flex items-center gap-2">

          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button onClick={onAddDebt}>
            <Plus className="mr-2 h-4 w-4" />
            Add Debt
          </Button>

        </div>

      </div>
    </header>
  );
}