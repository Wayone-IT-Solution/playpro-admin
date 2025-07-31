import { Patch } from "./apiUtils";

export const functionList: Record<string, (data: any) => Promise<boolean>> = {
  Reviews: async (data: any) => {
    if (!data?._id) return false;
    try {
      const url = `/api/review/${data._id}`;
      const response: any = await Patch(url, { status: data?.status });
      return response?.success ?? false;
    } catch (error) {
      console.log("Error updating agents status:", error);
      return false;
    }
  },
};
