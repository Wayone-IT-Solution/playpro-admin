"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import { queryField } from "../formtype/general";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import DynamicForm from "@/components/common/DynamicForm";
import {
  formatDate,
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

const QueryForm: React.FC<DealerFormProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [submitting, setSubmitting] = useState(false);
  const formField =
    data._id ? populateFormFields(queryField, data) : queryField;
  const [formData, setFormData] = useState<any>(
    data._id ? populateFormData(queryField, data) : {}
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

  const statusColorMap: Record<any, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    failed: "bg-gray-100 text-gray-800",
  };
  const { user, title, queryText, status, createdAt, _id } = data;

  return (
    <div>
      <div className="bg-white rounded-2xl mb-5 p-6 w-full border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Query #{_id.slice(-6)}</h2>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${statusColorMap[status]}`}
          >
            {status}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 underline">User Details</h3>
            <p className="text-sm text-gray-600">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.phoneNumber}</p>
            <p className="text-sm text-gray-600">Points: {user.points}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 underline">Query Info</h3>
            <p className="text-sm text-gray-600">Title: {title}</p>
            <p className="text-sm text-gray-600">Query: {queryText}</p>
            <p className="text-sm text-gray-600">
              Requested on: {formatDate(new Date(createdAt))}
            </p>
          </div>
        </div>
      </div>
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

export default QueryForm;
