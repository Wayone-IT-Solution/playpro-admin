"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { endpoints } from "@/data/endpoints";
import { productcategoryType } from "../formtype/general";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import DynamicForm from "@/components/common/DynamicForm";
import {
  getSelectFormattedData,
  populateFormData,
  populateFormFields,
} from "@/hooks/general";

interface ProductCategoryFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const ProductCategoryForm: React.FC<ProductCategoryFormProps> = (
  props: any
) => {
  const data = props.data;
  const formType = props.formType;
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formField, setFormField] = useState(
    data?._id
      ? populateFormFields(productcategoryType, data)
      : productcategoryType
  );

  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(productcategoryType, data) : {}
  );

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const url = "/api/product-category/public";
        const response: any = await Fetch(url, {}, 5000, true, false);
        if (response.success && response?.data.length > 0) {
          const filteredData = response.data;
          const selectData = getSelectFormattedData(filteredData);
          const updatedFormField = formField.map((obj: any) => {
            if (obj.name === "parentCategory")
              return { ...obj, options: selectData };
            return obj;
          });
          setFormField(updatedFormField);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategory();
    // eslint-disable-next-line
  }, []);

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = endpoints[formType]?.url;
      if (data?._id) url = `${url}/${data?._id}`;

      setSubmitting(true);

      const response: any = data?._id
        ? await Put(url, updatedData)
        : await Post(url, updatedData);

      if (response.success) {
        const url = endpoints[formType]?.url;
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
      {!isLoading && (
        <>
          <h2 className="text-2xl pb-4 font-semibold text-gray-800">
            {data?._id ? "Edit Category Details" : "Add New Category"}
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
        </>
      )}
    </div>
  );
};

export default ProductCategoryForm;
