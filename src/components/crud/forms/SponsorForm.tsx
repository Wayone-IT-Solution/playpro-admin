"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { endpoints } from "@/data/endpoints";
import { sponsorField } from "../formtype/general";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import DynamicForm from "@/components/common/DynamicForm";
import {
  flattenObject,
  populateFormData,
  populateFormFields,
} from "@/hooks/general";

interface SponsorFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const SponsorForm: React.FC<SponsorFormProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formField, setFormField] = useState(
    data._id ? populateFormFields(sponsorField, data) : sponsorField
  );

  const [formData, setFormData] = useState<any>(
    data._id
      ? populateFormData(sponsorField, flattenObject(data))
      : {}
  );

  useEffect(() => {
    const fetchCategrory = async () => {
      try {
        const url = "/api/category";
        const params = { limit: 5000, page: 1, isActive: true };
        const response: any = await Fetch(url, params, 5000, true, false);
        if (response.success && response?.data?.result.length > 0) {
          const selectData = response?.data?.result.map((option: any) => ({
            label: option?._id,
            value: option?.name?.ar + " (" + option?.name?.en + ")",
          }));
          const updatedFormField = formField.map((obj: any) => {
            if (obj.name === "categoryId")
              return { ...obj, options: selectData };
            return obj;
          });
          setFormField(updatedFormField);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategrory();
    // eslint-disable-next-line
  }, []);

  const makeApiCall = async (updatedData: any) => {
    try {
      const url = `${endpoints[formType].url}${!data._id ? "" : "/" + data._id
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
        {data?._id ? "Edit Sponsor Details" : "Add New Sponsor"}
      </h2>
      {!loading && (
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
      )}
    </div>
  );
};

export default SponsorForm;
