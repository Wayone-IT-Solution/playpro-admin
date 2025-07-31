"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = 
  [
  { key: "_id", label: "Ground ID", sortable: true },
  { key: "name", label: "Ground Name", sortable: true },
  { key: "address", label: "Location", sortable: true },
  { key: "email", label: "Registered Email", sortable: true },
  { key: "mobile", label: "Contact Number", sortable: true },
  {
    key: "status",
    label: "Current Status",
    sortable: true,
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" }
  },
  { key: "pricePerHour", label: "Hourly Price (₹)", sortable: true },
  {
    key: "createdAt",
    label: "Date of Registration",
    sortable: true,
    isDateTime: true
  },
  {
    key: "updatedAt",
    label: "Last Modified",
    sortable: true,
    isDateTime: true
  }
];


const filterOptions = [
  { label: "Emp. ID", value: "_id" },
  { label: "Name", value: "username" },
  { label: "Email", value: "email" },
  { label: "Phone Number", value: "mobile" },
  {label: "Address", value: "address"},
];

const Page: React.FC = () => {
  const formType = "Ground Listing";
  const { data, loading, error } = useFetch(endpoints[formType]?.url);
  const updatedData = data?.data?.result;
  const paginationData = data?.data?.pagination;
  let operationsAllowed = endpoints[formType]?.operations;
  operationsAllowed = {
    ...operationsAllowed,
    delete: false,
    update: false,
    create: false,
  };

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

export default Page;
