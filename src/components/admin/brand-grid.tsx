import { useState } from "react";
import { Tag, Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BrandAddDialog, BrandEditDialog } from "./brand";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import type { Brand } from "@/types";
import {
  useBrands,
  useCreateBrand,
  useDeleteBrand,
  useUpdateBrand,
} from "@/hook/brand";
import { EmptyData } from "../empty/empty-data";

export function BrandsGrid() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Brand | null>(null);

  const { data: brands = [], isLoading } = useBrands();
  const { mutateAsync: createBrand, isPending: isCreating } = useCreateBrand();
  const { mutateAsync: updateBrand, isPending: isUpdating } = useUpdateBrand();
  const { mutateAsync: deleteBrand, isPending: isDeleting } = useDeleteBrand();

  const handleEdit = (item: Brand) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item: Brand) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedItem) {
      await deleteBrand(selectedItem.id);
    }
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  const handleAddBrand = async (data: { name: string }) => {
    await createBrand(data);
  };

  const handleEditBrand = async (id: string, data: { name: string }) => {
    await updateBrand({ id, name: data.name });
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
            Add Brand
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="glass rounded-xl p-6 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Skeleton className="h-8 flex-1 rounded-md" />
                  <Skeleton className="h-8 flex-1 rounded-md" />
                </div>
              </div>
            ))
          ) : brands.length === 0 ? (
            <div className="col-span-full">
              <EmptyData category="Brands" />
            </div>
          ) : (
            brands.map((brand) => (
              <div key={brand.id} className="glass glass-hover rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Tag className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {brand.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {brand.slug}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(brand)}
                    className="flex-1 glass border-glass-border text-primary hover:bg-primary/10"
                  >
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(brand)}
                    className="flex-1 glass border-glass-border text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="mr-2 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <BrandAddDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddBrand}
        isPending={isCreating}
      />

      <BrandEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onEdit={handleEditBrand}
        isPending={isUpdating}
        brand={selectedItem ?? undefined}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedItem?.name || ""}
        isPending={isDeleting}
        entityType="Brand"
      />
    </>
  );
}
