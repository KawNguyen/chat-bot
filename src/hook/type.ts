import { type } from "@/api/type";
import type { Type } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const TYPE_KEYS = {
  all: ["types"] as const,
  lists: () => [...TYPE_KEYS.all, "list"] as const,
};

export const useTypes = () => {
  return useQuery({
    queryKey: TYPE_KEYS.lists(),
    queryFn: async () => {
      const response = await type.getAllTypes();
      return response.data as Type[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (typeData: { name: string }) => {
      const response = await type.createType(typeData);
      return response.data as Type;
    },
    onSuccess: (newType: Type) => {
      // Invalidate and refetch types list
      queryClient.invalidateQueries({ queryKey: TYPE_KEYS.lists() });
      // Optimistically update the cache
      queryClient.setQueryData(TYPE_KEYS.lists(), (old: Type[] | undefined) => {
        return old ? [...old, newType] : [newType];
      });

      toast.success("Type created successfully!");
    },
  });
};

export const useUpdateType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; name: string }) => {
      const response = await type.updateType(data.id, { name: data.name });
      return response.data as Type;
    },
    onSuccess: (updatedType: Type) => {
      // Invalidate and refetch types list
      queryClient.invalidateQueries({ queryKey: TYPE_KEYS.lists() });

      // Optimistically update the cache
      queryClient.setQueryData(TYPE_KEYS.lists(), (old: Type[] | undefined) => {
        return old
          ? old.map((type) =>
              type.slug === updatedType.slug ? updatedType : type
            )
          : [updatedType];
      });

      toast.success("Type updated successfully!");
    },

    onError: (error: unknown) => {
      let message = "Error updating type";
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

export const useDeleteType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await type.deleteType(id);
      return response.data;
    },
    onSuccess: (_, id) => {
      // Invalidate and refetch types list
      queryClient.invalidateQueries({ queryKey: TYPE_KEYS.lists() });

      // Optimistically update the cache
      queryClient.setQueryData(TYPE_KEYS.lists(), (old: Type[] | undefined) => {
        return old ? old.filter((type) => type.id !== id) : [];
      });

      toast.success("Type deleted successfully!");
    },

    onError: (error: unknown) => {
      let message = "Error deleting type";
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
