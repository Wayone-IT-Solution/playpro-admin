"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "name", label: "Product", image: true, imageWithKey: "image" },
  { key: "description", label: "Description", sortable: true },
  { key: "price", label: "Price (SAR)", sortable: true, prefix: "SAR " },
  { key: "brand", label: "Brand", sortable: true },
  { key: "category", label: "Category", sortable: true },
  { key: "subCategory", label: "Sub-Category", sortable: true },

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
