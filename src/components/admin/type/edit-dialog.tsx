import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Type } from "@/types";

interface TypeEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (slug: string, data: { name: string }) => void;
  isPending?: boolean;
  type?: Type;
}

export function TypeEditDialog({
  isOpen,
  onClose,
  onEdit,
  isPending = false,
  type,
}: TypeEditDialogProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (type) {
      setName(type.name);
    }
  }, [type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type) {
      onEdit(type.id, { name });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Type</DialogTitle>
            <DialogDescription>
              Update headphone type information.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter type name"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Type"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
