"use client";

import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { endpoints } from "@/data/endpoints";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import DynamicForm from "@/components/common/DynamicForm";
import {
  flattenObject,
  populateFormData,
  populateFormFields,
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formField, setFormField] = useState(
    data._id ? populateFormFields(academyFormType, data) : academyFormType
  );

  const [formData, setFormData] = useState<any>(
    data._id
      ? populateFormData(
          academyFormType,
          flattenObject(data, "", [
            "sports",
            "workingDays",
            "coaches",
            "grounds",
          ])
        )
      : {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = { limit: 5000, page: 1 };
        const [groundResp, coachResp]: any = await Promise.all([
          Fetch("/api/ground", params, 5000, true, false),
          Fetch("/api/coach", params, 5000, true, false),
        ]);

        const mapOptions = (arr: any[], fallback: string) =>
          arr.map((item: any) => ({
            label: item._id,
            value: item?.name?.en || item?.name || fallback,
          }));

        const groundOptions =
          groundResp?.success && groundResp.data?.result?.length
            ? mapOptions(groundResp.data.result, "Unnamed Ground")
            : [];

        const coachOptions =
          coachResp?.success && coachResp.data?.result?.length
            ? mapOptions(coachResp.data.result, "Unnamed Coach")
            : [];

        const updatedFormField = formField.map((field: any) => {
          if (field.name === "grounds")
            return { ...field, options: groundOptions };
          if (field.name === "coaches")
            return { ...field, options: coachOptions };
          return field;
        });
        setFormField(updatedFormField);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {!loading && (
        <DynamicForm
          id={data._id}
          returnAs="formData"
          fields={formField}
          formData={formData}
          submitting={submitting}
          onClose={props?.onClose}
          setFormData={setFormData}
          makeApiCall={makeApiCall}
        />
      )}
    </div>
  );
};

export default AcademyForm;
