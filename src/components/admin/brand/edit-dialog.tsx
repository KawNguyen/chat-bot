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
import type { Brand } from "@/types";
import { Spinner } from "@/components/ui/spinner";

interface BrandEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (slug: string, data: { name: string }) => void;
  isPending?: boolean;
  brand?: Brand;
}

export function BrandEditDialog({
  isOpen,
  onClose,
  onEdit,
  isPending = false,
  brand,
}: BrandEditDialogProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (brand) {
      setName(brand.name);
    }
  }, [brand]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (brand) {
      onEdit(brand.id, { name });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Brand</DialogTitle>
            <DialogDescription>Update brand information.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter brand name"
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
              {isPending ? (
                <>
                  <Spinner /> Updating...
                </>
              ) : (
                "Update Brand"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
