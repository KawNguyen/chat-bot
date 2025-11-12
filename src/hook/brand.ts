import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { brand } from "@/api/brand";
import { toast } from "sonner";
import type { Brand } from "@/types";

// Query Keys
const BRAND_KEYS = {
  all: ["brands"] as const,
  lists: () => [...BRAND_KEYS.all, "list"] as const,
};

// Get all brands
export const useBrands = () => {
  return useQuery({
    queryKey: BRAND_KEYS.lists(),
    queryFn: async () => {
      const response = await brand.getAllBrands();
      return response.data as Brand[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create brand
export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (brandData: { name: string }) => {
      const response = await brand.createBrand(brandData);
      return response.data as Brand;
    },
    onSuccess: (newBrand: Brand) => {
      queryClient.invalidateQueries({ queryKey: BRAND_KEYS.lists() });

      queryClient.setQueryData(
        BRAND_KEYS.lists(),
        (old: Brand[] | undefined) => {
          return old ? [...old, newBrand] : [newBrand];
        }
      );

      toast.success("Brand created successfully!");
    },
    onError: (error: unknown) => {
      let message = "Error creating brand";
      if (error && typeof error === "object" && "response" in error) {
        const response = (
          error as { response?: { data?: { message?: string } } }
        ).response;
        message = response?.data?.message || message;
      }
      toast.error(message);
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string; name: string }) => {
      const response = await brand.updateBrand(data.id, { name: data.name });
      return response.data as Brand;
    },
    onSuccess: (updatedBrand: Brand) => {
      // Invalidate and refetch brands list
      queryClient.invalidateQueries({ queryKey: BRAND_KEYS.lists() });

      // Optimistically update the cache
      queryClient.setQueryData(
        BRAND_KEYS.lists(),
        (old: Brand[] | undefined) => {
          return old
            ? old.map((brand) =>
                brand.slug === updatedBrand.slug ? updatedBrand : brand
              )
            : [updatedBrand];
        }
      );

      toast.success("Brand updated successfully!");
    },
    onError: (error: unknown) => {
      let message = "Error updating brand";
      if (error && typeof error === "object" && "response" in error) {
        const response = (
          error as { response?: { data?: { message?: string } } }
        ).response;
        message = response?.data?.message || message;
      }
      toast.error(message);
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await brand.deleteBrand(id);
      return response.data as { message: string };
    },
    onSuccess: (_, id) => {
      // Invalidate and refetch brands list
      queryClient.invalidateQueries({ queryKey: BRAND_KEYS.lists() });

      // Optimistically update the cache
      queryClient.setQueryData(
        BRAND_KEYS.lists(),
        (old: Brand[] | undefined) => {
          return old ? old.filter((brand) => brand.id !== id) : [];
        }
      );

      toast.success("Brand deleted successfully!");
    },
    onError: (error: unknown) => {
      let message = "Error deleting brand";
      if (error && typeof error === "object" && "response" in error) {
        const response = (
          error as { response?: { data?: { message?: string } } }
        ).response;
        message = response?.data?.message || message;
      }
      toast.error(message);
    },
  });
};

