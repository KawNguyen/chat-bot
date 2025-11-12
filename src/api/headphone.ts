import axiosInstance from "@/lib/axios-instance";

export const headphone = {
  getAllHeadphones: () => {
    const data = axiosInstance.get("/headphones");
    return data;
  },

  createHeadphone: (headphoneData: {
    name: string;
    price: number;
    brand_id: string;
    type_id: string;
  }) => {
    const data = axiosInstance.post("/headphones/create", headphoneData);
    return data;
  },

  updateHeadphone: (
    id: string,
    headphoneData: {
      name: string;
      price: number;
      brand_id: string;
      type_id: string;
    }
  ) => {
    const data = axiosInstance.put(`/headphones/update/${id}`, headphoneData);
    return data;
  },

  deleteHeadphone: (id: string) => {
    const data = axiosInstance.delete(`/headphones/delete/${id}`);
    return data;
  },
};
