import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  entityType: string;
  isPending?: boolean;
}

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  entityType,
  isPending,
}: DeleteConfirmDialogProps) {
  if (!isOpen) return null;

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
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <h2 className="text-xl font-bold text-foreground">
              Delete {entityType}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="mb-6 text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-foreground">{itemName}</span>?
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 glass border-glass-border bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Spinner className="size-6 text-red-500" /> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
