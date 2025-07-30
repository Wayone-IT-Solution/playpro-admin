"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { userFormType } from "../formtype/userFormType";
import DynamicForm from "@/components/common/DynamicForm";
import {
  populateFormData,
  populateFormFields,
} from "@/hooks/general";

interface DealerFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const removed = ["password"];
const disabled = ["email", "password"];

const UserForm: React.FC<DealerFormProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [submitting, setSubmitting] = useState(false);
  const formField =
    data._id ? populateFormFields(userFormType, data, disabled, removed) : userFormType;
  const [formData, setFormData] = useState<any>(
    data._id ? populateFormData(userFormType, data) : {}
  );

  const makeApiCall = async (updatedData: any) => {
    try {
      const url = endpoints[formType]?.url;
      setSubmitting(true);
      const response: any = data._id
        ? await Put(`${url}/${data._id}`, updatedData)
        : await Post(url, updatedData);

      if (response.success) {
        const resp: any = await Fetch(url, {}, 5000, true, false);
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
        {data?._id ? "Edit Employee Details" : "Add New Employee"}
      </h2>
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
    </div>
  );
};

export default UserForm;
