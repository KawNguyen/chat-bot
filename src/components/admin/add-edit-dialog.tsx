import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Brand, Headphone, Type } from "@/types";
import { Spinner } from "../ui/spinner";

type DialogMode = "add" | "edit";
type EntityType = "headphone" | "brand" | "type";

interface AddEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode: DialogMode;
  mutation: (data: Type | Brand | Headphone) => void;
  isPending?: boolean;
  entityType: EntityType;
  initialData?: Type | Brand | Headphone;
}

export function AddEditDialog({
  isOpen,
  onClose,
  mode,
  mutation,
  isPending,
  entityType,
  initialData,
}: AddEditDialogProps) {
  if (!isOpen) return null;

  const getTitle = () => {
    const action = mode === "add" ? "Add New" : "Edit";
    const entity = entityType.charAt(0).toUpperCase() + entityType.slice(1);
    return `${action} ${entity}`;
  };

  const renderFields = () => {
    switch (entityType) {
      case "headphone":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="WH-1000XM5"
                defaultValue={initialData?.name}
                className="glass border-glass-border bg-transparent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="399"
                defaultValue={
                  entityType === "headphone" &&
                  initialData &&
                  "price" in initialData
                    ? initialData.price
                    : undefined
                }
                className="glass border-glass-border bg-transparent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                name="brand"
                placeholder="Sony"
                defaultValue={
                  entityType === "headphone" &&
                  initialData &&
                  "brand" in initialData
                    ? initialData.brand
                    : undefined
                }
                className="glass border-glass-border bg-transparent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                name="type"
                placeholder="Over-Ear"
                defaultValue={
                  entityType === "headphone" &&
                  initialData &&
                  "type" in initialData
                    ? initialData.type
                    : undefined
                }
                className="glass border-glass-border bg-transparent"
              />
            </div>
          </>
        );
      case "brand":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Brand Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Sony"
                defaultValue={initialData?.name}
                className="glass border-glass-border bg-transparent"
              />
            </div>
          </>
        );
      case "type":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Type Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Over-Ear"
                defaultValue={initialData?.name}
                className="glass border-glass-border bg-transparent"
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="glass relative z-10 w-full max-w-md rounded-xl p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">{getTitle()}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form
          className="space-y-4"
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);

            let payload: Type | Brand | Headphone;

            if (entityType === "headphone") {
              payload = {
                ...(initialData as Headphone),
                name: formData.get("name") as string,
                price: Number(formData.get("price")),
                brand: formData.get("brand") as string,
                type: formData.get("type") as string,
              };
            } else if (entityType === "brand") {
              payload = {
                ...(initialData as Brand),
                name: formData.get("name") as string,
              };
            } else {
              payload = {
                ...(initialData as Type),
                name: formData.get("name") as string,
              };
            }

            await mutation(payload);
            onClose();
          }}
        >
          {renderFields()}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 glass border-glass-border bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isPending}
            >
              {mode === "add" ? (
                isPending ? (
                  <>
                    <Spinner /> Adding...
                  </>
                ) : (
                  "Add"
                )
              ) : isPending ? (
                <>
                  <Spinner /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
