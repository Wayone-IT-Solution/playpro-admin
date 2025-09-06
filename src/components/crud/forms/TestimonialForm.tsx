"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { testimonialField } from "../formtype/general";
import DynamicForm from "@/components/common/DynamicForm";
import {
  deepUnflatten,
  flattenObject,
  makeFormData,
  populateFormData,
  populateFormFields,
} from "@/hooks/general";

interface BannerFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const TestimonialForm: React.FC<BannerFormProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [submitting, setSubmitting] = useState(false);
  const formField = data._id
    ? populateFormFields(testimonialField, data)
    : testimonialField;

  const [formData, setFormData] = useState<any>(
    data._id
      ? populateFormData(testimonialField, flattenObject(data))
      : {}
  );

  const makeApiCall = async (updatedData: any) => {
    try {
      const url = `${endpoints[formType].url}${!data._id ? "" : "/" + data._id
        }`;

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
        {data?._id ? "Edit Testimonial Details" : "Add New Testimonial"}
      </h2>
      <DynamicForm
        id={data._id}
        fields={formField}
        returnAs="object"
        formData={formData}
        submitting={submitting}
        onClose={props?.onClose}
        setFormData={setFormData}
        makeApiCall={makeApiCall}
      />
    </div>
  );
};

export default TestimonialForm;
