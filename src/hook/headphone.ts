import { headphone } from "@/api/headphone";
import type { Headphone } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const headPhoneKeys = {
  all: ["headphones"] as const,
  lists: () => [...headPhoneKeys.all, "list"] as const,
  details: () => [...headPhoneKeys.all, "detail"] as const,
  detail: (id: number) => [...headPhoneKeys.details(), id] as const,
};

export const useHeadphones = () => {
  return useQuery({
    queryKey: headPhoneKeys.lists(),
    queryFn: async () => {
      const response = await headphone.getAllHeadphones();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateHeadphone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (headphoneData: {
      name: string;
      price: number;
      brand_id: string;
      type_id: string;
    }) => {
      const response = await headphone.createHeadphone(headphoneData);
      return response.data as Headphone;
    },
    onSuccess: (newHeadphone: Headphone) => {
      queryClient.invalidateQueries({ queryKey: headPhoneKeys.lists() });

      queryClient.setQueryData(
        headPhoneKeys.lists(),
        (old: Headphone[] | undefined) => {
          return old ? [...old, newHeadphone] : [newHeadphone];
        }
      );

      toast.success("Headphone created successfully!");
    },

    onError: (error: unknown) => {
      let message = "Error creating headphone";
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

export const useUpdateHeadphone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: string;
      headphoneData: {
        name: string;
        price: number;
        brand_id: string;
        type_id: string;
      };
    }) => {
      const response = await headphone.updateHeadphone(
        data.id,
        data.headphoneData
      );
      return response.data as Headphone;
    },
    onSuccess: (updatedHeadphone: Headphone) => {
      queryClient.invalidateQueries({ queryKey: headPhoneKeys.lists() });

      queryClient.setQueryData(
        headPhoneKeys.lists(),
        (old: Headphone[] | undefined) => {
          return old
            ? old.map((headphone) =>
                headphone.slug === updatedHeadphone.slug
                  ? updatedHeadphone
                  : headphone
              )
            : [updatedHeadphone];
        }
      );

      toast.success("Headphone updated successfully!");
    },
    onError: (error: unknown) => {
      let message = "Error updating headphone";
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

export const useDeleteHeadphone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await headphone.deleteHeadphone(id);
      return response.data as { message: string };
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: headPhoneKeys.lists() });
      queryClient.setQueryData(
        headPhoneKeys.lists(),
        (old: Headphone[] | undefined) => {
          return old ? old.filter((headphone) => headphone.id !== id) : [];
        }
      );
      toast.success("Headphone deleted successfully!");
    },
    onError: (error: unknown) => {
      let message = "Error deleting headphone";
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
