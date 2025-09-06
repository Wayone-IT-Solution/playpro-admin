"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "name.en", label: "Product (EN)", image: true, imageWithKey: "image" },
  { key: "name.ar", label: "المنتج (AR)", image: true, imageWithKey: "image" },

  { key: "description.en", label: "Description (EN)", sortable: true },
  { key: "description.ar", label: "الوصف (AR)", sortable: true },

  { key: "price", label: "Price (SAR)", sortable: true, prefix: "SAR " },

  { key: "brand.en", label: "Brand (EN)", sortable: true },
  { key: "brand.ar", label: "الماركة (AR)", sortable: true },

  { key: "category.en", label: "Category (EN)", sortable: true },
  { key: "category.ar", label: "الفئة (AR)", sortable: true },

  { key: "subCategory.en", label: "Sub-Category (EN)", sortable: true },
  { key: "subCategory.ar", label: "الفئة الفرعية (AR)", sortable: true },

  {
    key: "isActive",
    label: "Status",
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
  { key: "createdAt", label: "Date Created", sortable: true, isDateTime: true },
  { key: "updatedAt", label: "Last Updated", sortable: true, isDateTime: true },
];

const filterOptions = [
  { label: "Product Name", value: "name" },
  { label: "Description", value: "description" },
  { label: "Brand", value: "brand" },
  { label: "Category", value: "category" },
  { label: "Sub-Category", value: "subCategory" },
];

const Contacts: React.FC = () => {
  const formType = "Products";
  const { data, loading, error } = useFetch(endpoints[formType]?.url);
  const updatedData = data?.data?.result;
  const paginationData = data?.data?.pagination;
  const operationsAllowed = endpoints[formType]?.operations;

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type={formType}
          columns={columns}
          data={updatedData}
          filterOptions={filterOptions}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Contacts;
