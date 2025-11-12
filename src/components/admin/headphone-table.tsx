import { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeadphoneAddDialog, HeadphoneEditDialog } from "./headphone";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { Headphone } from "@/types";
import {
  useCreateHeadphone,
  useDeleteHeadphone,
  useHeadphones,
  useUpdateHeadphone,
} from "@/hook/headphone";
import { useBrands } from "@/hook/brand";
import { useTypes } from "@/hook/type";

export function HeadphonesTable() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Headphone | null>(null);

  const { data: headphones = [], isLoading } = useHeadphones();
  const { data: brands = [] } = useBrands();
  const { data: types = [] } = useTypes();

  const { mutateAsync: createHeadphone, isPending: isCreating } =
    useCreateHeadphone();
  const { mutateAsync: updateHeadphone, isPending: isUpdating } =
    useUpdateHeadphone();
  const { mutateAsync: deleteHeadphone } = useDeleteHeadphone();

  const handleEdit = (item: Headphone) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item: Headphone) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedItem) {
      await deleteHeadphone(selectedItem.id.toString());
    }
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  const handleAddHeadphone = async (data: {
    name: string;
    price: number;
    brand_id: string;
    type_id: string;
  }) => {
    await createHeadphone(data);
  };

  const handleEditHeadphone = async (
    id: string,
    data: {
      name: string;
      price: number;
      brand_id: string;
      type_id: string;
    }
  ) => {
    await updateHeadphone({ id, headphoneData: data });
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
            Add Headphone
          </Button>
        </div>

        <div className="glass rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-glass-border">
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Brand
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Price
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-glass-border">
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-20" />
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-16" />
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-12" />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                          </div>
                        </td>
                      </tr>
                    ))
                  : headphones.map((headphone: Headphone) => (
                      <tr key={headphone.id} className="glass-hover">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-foreground">
                              {headphone.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {headphone.slug}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {headphone.brand.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {headphone.type.name}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground">
                          ${headphone.price}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleEdit(headphone);
                              }}
                              className="h-8 w-8 text-primary hover:bg-primary/10 relative z-2"
                              title="Edit headphone"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDelete(headphone);
                              }}
                              className="h-8 w-8 text-destructive hover:bg-destructive/10 relative z-2"
                              title="Delete headphone"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <HeadphoneAddDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddHeadphone}
        isPending={isCreating}
        brands={brands}
        types={types}
      />

      <HeadphoneEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onEdit={handleEditHeadphone}
        isPending={isUpdating}
        headphone={selectedItem ?? undefined}
        brands={brands}
        types={types}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedItem?.name || ""}
        entityType="Headphone"
      />
    </>
  );
}
