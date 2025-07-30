import { Fetch, Put } from "./apiUtils";

export const functionList: Record<string, (data: any) => Promise<boolean>> = {
  Agent: async (data: any) => {
    if (!data?._id) return false;
    try {
      const url = `/api/support/deactivate-agent/${data._id}`;
      const response: any = await Fetch(url);
      return response?.success ?? false;
    } catch (error) {
      console.log("Error updating agents status:", error);
      return false;
    }
  },
  "Pre Interviewed": async (data: any) => {
    if (!data?._id) return false;
    try {
      const url = `/api/preinterviewd/${data._id}`;
      const response: any = await Put(url, { slug: "pre_interviewed_candidate", status: data.status });
      return response?.success ?? false;
    } catch (error) {
      console.log("Error updating agents status:", error);
      return false;
    }
  },
  "Pre-screened Contractor": async (data: any) => {
    if (!data?._id) return false;
    try {
      const url = `/api/preinterviewedcontractor/${data._id}`;
      const response: any = await Put(url, { slug: "pre_screened_contractor", status: data.status });
      return response?.success ?? false;
    } catch (error) {
      console.log("Error updating agents status:", error);
      return false;
    }
  },
  "Compliance Pro": async (data: any) => {
    if (!data?._id) return false;
    try {
      const url = `/api/compliancechecklist/${data._id}`;
      const response: any = await Put(url, { slug: "compliance_pro", status: data.status });
      return response?.success ?? false;
    } catch (error) {
      console.log("Error updating agents status:", error);
      return false;
    }
  },
  "Reliable Payer": async (data: any) => {
    if (!data?._id) return false;
    try {
      const url = `/api/reliablepayer/${data._id}`;
      const response: any = await Put(url, { slug: "reliable_payer", status: data.status });
      return response?.success ?? false;
    } catch (error) {
      console.log("Error updating agents status:", error);
      return false;
    }
  },
  "Safe Workplace": async (data: any) => {
    if (!data?._id) return false;
    try {
      const url = `/api/safeworkplace/${data._id}`;
      const response: any = await Put(url, { slug: "safe_workplace", status: data.status });
      return response?.success ?? false;
    } catch (error) {
      console.log("Error updating agents status:", error);
      return false;
    }
  },
  "Best Practices": async (data: any) => {
    if (!data?._id) return false;
    try {
      const url = `/api/bestpracticesfacility/${data._id}`;
      const response: any = await Put(url, { slug: "best_facility__practices", status: data.status });
      return response?.success ?? false;
    } catch (error) {
      console.log("Error updating agents status:", error);
      return false;
    }
  },
  "Trusted Partner": async (data: any) => {
    if (!data?._id) return false;
    try {
      const url = `/api/trustedpartner/${data._id}`;
      const response: any = await Put(url, { slug: "trusted_partner", status: data.status });
      return response?.success ?? false;
    } catch (error) {
      console.log("Error updating agents status:", error);
      return false;
    }
  },
};
