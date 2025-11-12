import axiosInstance from "@/lib/axios-instance";

export const chatBot = {
  prompt: (message: string) => {
    const data = axiosInstance.post("/chat", { message });
    return data;
  },
};
