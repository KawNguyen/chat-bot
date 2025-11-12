import { useState } from "react";
import { Package, Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TypeAddDialog, TypeEditDialog } from "./type";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import type { Type } from "@/types";
import {
  useCreateType,
  useDeleteType,
  useTypes,
  useUpdateType,
} from "@/hook/type";
import { EmptyData } from "../empty/empty-data";

export function TypesGrid() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Type | null>(null);

  const { data: types = [], isLoading } = useTypes();
  const { mutateAsync: createType, isPending: isCreating } = useCreateType();
  const { mutateAsync: updateType, isPending: isUpdating } = useUpdateType();
  const { mutateAsync: deleteType, isPending: isDeleting } = useDeleteType();

  const handleEdit = (item: Type) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item: Type) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedItem) {
      await deleteType(selectedItem.id);
    }
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  const handleAddType = async (data: { name: string }) => {
    await createType(data);
  };

  const handleEditType = async (id: string, data: { name: string }) => {
    await updateType({ id, name: data.name });
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-primary text-primary-foreground"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Type
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="glass rounded-xl p-6 space-y-4 border border-border/40"
              >
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div>
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="flex gap-2 mt-4">
                  <Skeleton className="h-8 flex-1 rounded-md" />
                  <Skeleton className="h-8 flex-1 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : types.length === 0 ? (
          <div className="col-span-full">
            <EmptyData category="Types" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {types.map((type) => (
              <div key={type.id} className="glass glass-hover rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {type.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {type.slug}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(type)}
                    className="flex-1 glass border-glass-border text-primary hover:bg-primary/10"
                  >
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(type)}
                    className="flex-1 glass border-glass-border text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="mr-2 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <TypeAddDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddType}
        isPending={isCreating}
      />

      <TypeEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onEdit={handleEditType}
        isPending={isUpdating}
        type={selectedItem ?? undefined}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        isPending={isDeleting}
        itemName={selectedItem?.name || ""}
        entityType="Type"
      />
    </>
  );
}
