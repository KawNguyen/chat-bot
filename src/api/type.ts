import axiosInstance from "@/lib/axios-instance";

export const type = {
  getAllTypes: () => {
    const data = axiosInstance.get("/types");
    return data;
  },

  createType: (typeData: { name: string }) => {
    const data = axiosInstance.post("/types/create", typeData);
    return data;
  },

  updateType: (id: string, typeData: { name: string }) => {
    const data = axiosInstance.put(`/types/update/${id}`, typeData);
    return data;
  },

  deleteType: (id: string) => {
    const data = axiosInstance.delete(`/types/delete/${id}`);
    return data;
  },
};
