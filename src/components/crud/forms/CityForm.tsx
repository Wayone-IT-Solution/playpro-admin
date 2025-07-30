"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { endpoints } from "@/data/endpoints";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { cityFormField } from "../formtype/general";
import DynamicForm from "@/components/common/DynamicForm";
import {
  flattenOneLevelPreserveKeys,
  getSelectFormattedData,
  populateFormData,
  populateFormFields,
} from "@/hooks/general";

interface CityFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const disabled = ["countryId", "stateId"]

const CityForm: React.FC<CityFormProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formField, setFormField] = useState<any[]>(
    data._id ? populateFormFields(cityFormField, data, disabled) : cityFormField
  );

  const [formData, setFormData] = useState<any>(
    data._id ? populateFormData(cityFormField, flattenOneLevelPreserveKeys(data)) : {}
  );

  // Fetch country and state dropdown options (especially for edit mode)
  useEffect(() => {
    const fetchInitialOptions = async () => {
      try {
        const countryUrl = "/api/statecity/country";
        const countryRes: any = await Fetch(countryUrl, { limit: 300, page: 1 }, 5000, true, false);
        const countryOptions = getSelectFormattedData(countryRes?.data?.result || []);

        let updatedFields = formField.map((obj: any) =>
          obj.name === "countryId" ? { ...obj, options: countryOptions } : obj
        );

        // Also load state list if editing and countryId exists
        if (data?._id && data.countryId) {
          const stateUrl = "/api/statecity/state";
          const stateRes: any = await Fetch(stateUrl, { limit: 1000, page: 1, countryId: data.countryId }, 5000, true, false);
          const stateOptions = getSelectFormattedData(
            [...(stateRes?.data?.result || [])].sort((a, b) => a.name.localeCompare(b.name))
          );

          updatedFields = updatedFields.map((obj: any) =>
            obj.name === "stateId" ? { ...obj, options: stateOptions } : obj
          );
        }

        setFormField(updatedFields);
      } catch (err) {
        console.error("Error initializing form: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialOptions();
    // eslint-disable-next-line
  }, []);

  // Fetch states dynamically on countryId change
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const url = "/api/statecity/state";
        const params = { limit: 1000, page: 1, countryId: formData.countryId };
        const response: any = await Fetch(url, params, 5000, true, false);
        if (response.success) {
          const selectData = getSelectFormattedData(
            [...response?.data?.result].sort((a, b) => a.name.localeCompare(b.name))
          );

          const updatedFormField = formField.map((obj: any) =>
            obj.name === "stateId" ? { ...obj, options: selectData } : obj
          );

          setFormField(updatedFormField);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    if (formData.countryId) fetchStates();
    // eslint-disable-next-line
  }, [formData.countryId]);

  const makeApiCall = async (updatedData: any) => {
    try {
      const url = `${endpoints[formType].url}${!data._id ? "" : "/" + data._id}`;
      setSubmitting(true);

      const response: any = data._id
        ? await Put(url, updatedData)
        : await Post(url, updatedData);

      if (response.success) {
        const fetchUrl = `${endpoints[formType].url}`;
        const resp: any = await Fetch(fetchUrl, {}, 5000, true, false);

        if (resp?.success) props?.setFilteredData(resp?.data?.result);
        if (resp?.success && resp?.data?.pagination) {
          props?.setPaginate(resp?.data?.pagination);
        }

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
        {data?._id ? "Edit City Details" : "Add New City"}
      </h2>
      {!loading && (
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
      )}
    </div>
  );
};

export default CityForm;
