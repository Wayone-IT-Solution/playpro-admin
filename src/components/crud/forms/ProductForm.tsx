"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { endpoints } from "@/data/endpoints";
import { productType } from "../formtype/general";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import DynamicForm from "@/components/common/DynamicForm";
import {
  flattenObject,
  populateFormData,
  populateFormFields,
} from "@/hooks/general";

interface ProductFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const ProductForm: React.FC<ProductFormProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formField, setFormField] = useState(
    data?._id ? populateFormFields(productType, data) : productType
  );

  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(productType, flattenObject(data)) : {}
  );

  useEffect(() => {
    const fetchSelectOptions = async () => {
      try {
        // Fetch Categories
        const categoryResp: any = await Fetch(
          "/api/product-category/public",
          {},
          5000,
          true,
          false
        );
        if (categoryResp.success) {
          const selectData = categoryResp.data.map((option: any) => ({
            label: option?._id,
            value: option?.name?.ar + " (" + option?.name?.en + ")",
          }));
          const updatedFormField = formField.map((obj: any) => {
            if (obj.name === "category") return { ...obj, options: selectData };
            return obj;
          });
          setFormField(updatedFormField);
        }

        // Fetch Brands
        const brandResp: any = await Fetch(
          "/api/brand/public",
          { limit: 10000, page: 1 },
          5000,
          true,
          false
        );
        if (brandResp.success) {
          const selectData = brandResp.data.result.map((option: any) => ({
            label: option?._id,
            value: option?.name?.ar + " (" + option?.name?.en + ")",
          }));
          const updatedFormField = (prev: any[]) =>
            prev.map((obj: any) =>
              obj.name === "brand" ? { ...obj, options: selectData } : obj
            );
          setFormField((prev: any) => updatedFormField(prev));
        }
      } catch (error) {
        console.log("Error fetching select options: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSelectOptions();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchSelectOptions = async () => {
      try {
        const categoryResp: any = await Fetch(
          "/api/product-category/public",
          { parentCategoryId: formData.category },
          5000,
          true,
          false
        );
        if (categoryResp.success) {
          const selectData = categoryResp.data.map((option: any) => ({
            label: option?._id,
            value: option?.name?.ar + " (" + option?.name?.en + ")",
          }));
          const updatedFormField = formField.map((obj: any) => {
            if (obj.name === "subCategory") return { ...obj, options: selectData };
            return obj;
          });
          setFormField(updatedFormField);
        }
      } catch (error) {
        console.log("Error fetching select options: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (formData.category) fetchSelectOptions();
    // eslint-disable-next-line
  }, [formData.category]);

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
            {data?._id ? "Edit Product Details" : "Add New Product"}
          </h2>
          <DynamicForm
            id={data?._id}
            returnAs="formData"
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

export default ProductForm;
