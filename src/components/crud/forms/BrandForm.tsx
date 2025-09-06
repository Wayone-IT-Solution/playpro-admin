"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { endpoints } from "@/data/endpoints";
import { brandFields } from "../formtype/general";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import DynamicForm from "@/components/common/DynamicForm";
import {
  deepUnflatten,
  flattenObject,
  makeFormData,
  populateFormData,
  populateFormFields,
} from "@/hooks/general";

interface BrandFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const BrandForm: React.FC<BrandFormProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formField] = useState(
    data?._id ? populateFormFields(brandFields, data) : brandFields
  );

  const [formData, setFormData] = useState<any>(
    data?._id
      ? populateFormData(brandFields, flattenObject(data))
      : {}
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  const makeApiCall = async (updatedData: any) => {
    try {
      const url = `${endpoints[formType].url}${data?._id ? "/" + data._id : ""}`;
      setSubmitting(true);
      const unflatten = deepUnflatten(updatedData);
      const formatedData = makeFormData(unflatten, true);
      const response: any = data._id
        ? await Put(url, formatedData)
        : await Post(url, formatedData);

      if (response.success) {
        const fetchUrl = `${endpoints[formType].url}`;
        const resp: any = await Fetch(fetchUrl, {}, 5000, true, false);

        if (resp?.success) props?.setFilteredData(resp?.data?.result);
        if (resp?.success && resp?.data?.pagination)
          props?.setPaginate(resp?.data?.pagination);

        props.onClose?.();
      } else {
        return toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl pb-4 font-semibold text-gray-800">
        {data?._id ? "Edit Brand Details" : "Add New Brand"}
      </h2>

      {!loading && (
        <DynamicForm
          id={data?._id}
          returnAs="object"
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

export default BrandForm;
