import axiosInstance from "@/lib/axios-instance";

export const brand = {
  getAllBrands: () => {
    const data = axiosInstance.get("/brands");
    return data;
  },

  createBrand: (brandData: { name: string }) => {
    const data = axiosInstance.post("/brands/create", brandData);
    return data;
  },

  updateBrand: (id: string, brandData: { name: string }) => {
    const data = axiosInstance.put(`/brands/update/${id}`, brandData);
    return data;
  },

  deleteBrand: (id: string) => {
    const data = axiosInstance.delete(`/brands/delete/${id}`);
    return data;
  },
};
