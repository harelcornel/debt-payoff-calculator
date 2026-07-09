import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { motion } from "motion/react";

export default function DebtCard({
  debt,
  onEdit,
  onDelete,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -2 }}
    >
      <Card className="transition-shadow hover:shadow-lg">
        <CardContent className="p-6">

          <div className="flex items-start justify-between">

            <div>

              <h3 className="text-lg font-semibold">
                {debt.name}
              </h3>

              <Badge
                variant="secondary"
                className="mt-2"
              >
                {debt.apr}% APR
              </Badge>

            </div>

            <DropdownMenu>

              <DropdownMenuTrigger asChild>

                <Button
                  variant="ghost"
                  size="icon"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>

              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">

                <DropdownMenuItem
                  onClick={() => onEdit?.(debt)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => onDelete?.(debt.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>

          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-muted-foreground">
                Balance
              </p>

              <h2 className="text-2xl font-bold">
                ₱{debt.balance.toLocaleString()}
              </h2>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Minimum Payment
              </p>

              <h2 className="text-2xl font-bold">
                ₱{debt.minimum.toLocaleString()}
              </h2>
            </div>

          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}