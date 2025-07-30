"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "Ticket ID" },
  { key: "userDetails.firstName", label: "First Name" },
  { key: "userDetails.lastName", label: "Last Name" },
  { key: "userDetails.email", label: "Email Address" },
  { key: "userDetails.phoneNumber", label: "Phone Number" },
  { key: "title", label: "Query" },
  {
    key: "createdAt",
    label: "Ticket Created",
    isDateTime: true,
    sortable: true,
  },
  {
    key: "status",
    sortable: true,
    isMultiPurpose: true,
    label: "Ticket Status",
    multiPurposeProps: { type: "label" },
  },
];

const filterOptions = [
  { label: "Ticket ID", value: "_id" },
  { label: "User name", value: "userDetails.firstName" },
  { label: "User mobile", value: "userDetails.phoneNumber" },
  { label: "User email", value: "userDetails.email" },
  { label: "Status", value: "status" },
];

const Page: React.FC = () => {
  const formType = "Customer Support";
  const { data, loading, error } = useFetch(endpoints[formType]?.url);
  const updatedData = data?.data?.result;
  const paginationData = data?.data?.pagination;
  let operationsAllowed = endpoints[formType]?.operations;
  operationsAllowed = { ...operationsAllowed, create: false, delete: false };

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
