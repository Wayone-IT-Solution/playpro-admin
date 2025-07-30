"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "Request ID", sortable: true },
  { key: "userDetails.firstName", label: "First Name" },
  { key: "userDetails.lastName", label: "Last Name" },
  { key: "userDetails.phoneNumber", label: "Mobile", sortable: true },
  { key: "userDetails.email", label: "Email", sortable: true },
  { key: "userDetails.upiId", label: "UPI ID", sortable: true },
  // { key: "userDetails.points", label: "Current Points", sortable: true },
  {
    key: "amount",
    label: "Requested Amount",
    isCurrency: true,
    sortable: true,
  },
  { key: "createdAt", label: "Requested On", isDateTime: true, sortable: true },
  { key: "updatedAt", label: "Last Updated", isDateTime: true, sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
];

const filterOptions = [
  { label: "Email", value: "userDetails.email" },
  { label: "Mobile", value: "userDetails.phoneNumber" },
  { label: "User Name", value: "userDetails.firstName" },
  { label: "Status", value: "status" },
  { label: "UPI ID", value: "userDetails.upiId" },
];

const Page: React.FC = () => {
  const formType = "Redeem Request";
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
