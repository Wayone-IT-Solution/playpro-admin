"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import DynamicForm from "@/components/common/DynamicForm";
import {
  flattenObject,
  populateFormData,
  populateFormFields,
  getSelectFormattedData,
} from "@/hooks/general";
import { academyFormType } from "../formtype/userFormType";

interface AcademyFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const AcademyForm: React.FC<AcademyFormProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formField, setFormField] = useState(
    data._id ? populateFormFields(academyFormType, data) : academyFormType
  );

  const [formData, setFormData] = useState<any>(
    data._id ? populateFormData(academyFormType, flattenObject(data)) : {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groundUrl = "/api/ground";
        const params = { limit: 500, page: 1 };
        const groundResp: any = await Fetch(
          groundUrl,
          params,
          5000,
          true,
          false
        );

        let updatedFormField = [...formField];

        if (groundResp.success && groundResp?.data?.result.length > 0) {
          const groundOptions = groundResp.data.result.map((g: any) => ({
            value: g?.name?.en || g?.name || "Unnamed Ground",
            label: g._id,
          }));

          updatedFormField = updatedFormField.map((obj: any) =>
            obj.name === "ground" ? { ...obj, options: groundOptions } : obj
          );

          console.log("Ground Options:", groundOptions);
        }

        // --- Fetch Coaches ---
        const coachUrl = "/api/coach";
        const coachResp: any = await Fetch(coachUrl, params, 5000, true, false);

        if (coachResp.success && coachResp?.data?.result.length > 0) {
          const coachOptions = coachResp.data.result.map((c: any) => ({
            value: c?.name?.en || c?.name || "Unnamed Coach",
            label: c._id,
          }));

          updatedFormField = updatedFormField.map((obj: any) =>
            obj.name === "coaches" ? { ...obj, options: coachOptions } : obj
          );

          console.log("Coach Options:", coachOptions);
        }

        setFormField(updatedFormField);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const makeApiCall = async (updatedData: any) => {
    try {
      const url = `${endpoints[formType].url}${
        !data._id ? "" : "/" + data._id
      }`;
      setSubmitting(true);
      const response: any = data._id
        ? await Put(url, updatedData)
        : await Post(url, updatedData);

      if (response.success) {
        const fetchUrl = `${endpoints[formType].url}`;
        const resp: any = await Fetch(fetchUrl, {}, 5000, true, false);
        if (resp?.success) props?.setFilteredData(resp?.data?.result);
        if (resp?.success && resp?.data?.pagination)
          props?.setPaginate(resp?.data?.pagination);
        props.onClose?.();
      } else return toast.error("Something went wrong!");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl pb-4 font-semibold text-gray-800">
        {data?._id ? "Edit Academy Details" : "Add New Academy"}
      </h2>
      <DynamicForm
        id={data._id}
        fields={formField}
        returnAs="formData"
        formData={formData}
        submitting={submitting}
        onClose={props?.onClose}
        setFormData={setFormData}
        makeApiCall={makeApiCall}
      />
    </div>
  );
};

export default AcademyForm;
