import { useState } from "react";
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

interface HeadphoneAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    name: string;
    price: number;
    brand_id: string;
    type_id: string;
  }) => void;
  isPending?: boolean;
  brands: Array<{ id: string; name: string }>;
  types: Array<{ id: string; name: string }>;
}

export function HeadphoneAddDialog({
  isOpen,
  onClose,
  onAdd,
  isPending = false,
  brands = [],
  types = [],
}: HeadphoneAddDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    brand_id: "",
    type_id: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: "", price: 0, brand_id: "", type_id: "" });
    onClose();
  };

  const handleChange = (
    field: keyof typeof formData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Headphone</DialogTitle>
            <DialogDescription>
              Add a new headphone to the catalog.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter headphone name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="brand">Brand</Label>
              <select
                id="brand"
                value={formData.brand_id}
                onChange={(e) => handleChange("brand_id", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                value={formData.type_id}
                onChange={(e) => handleChange("type_id", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Select Type</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Headphone"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
