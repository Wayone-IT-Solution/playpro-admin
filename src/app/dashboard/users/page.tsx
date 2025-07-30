"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "User ID", sortable: true },
  { key: "firstName", label: "First Name", sortable: true },
  { key: "lastName", label: "Last Name", sortable: true },
  { key: "email", label: "Email Address", sortable: true },
  { key: "phoneNumber", label: "Phone Number", sortable: true },
  { key: "upiId", label: "UPI ID", sortable: true },
  { key: "dateOfBirth", label: "Date Of Birth", sortable: true, isDate: true },
  { key: "points", sortable: true, label: "Current Points" },
  {
    key: "createdAt",
    label: "Registration Date",
    sortable: true,
    isDateTime: true,
  },
  {
    key: "updatedAt",
    label: "Last Updated",
    sortable: true,
    isDateTime: true,
  },
];

const filterOptions = [
  { label: "Emp. ID", value: "_id" },
  { label: "Name", value: "username" },
  { label: "Email", value: "email" },
  { label: "Role", value: "role" },
];

const Page: React.FC = () => {
  const formType = "User";
  const { data, loading, error } = useFetch(endpoints[formType]?.url);
  const updatedData = data?.data?.result;
  const paginationData = data?.data?.pagination;
  let operationsAllowed = endpoints[formType]?.operations;
  operationsAllowed = { ...operationsAllowed, delete: false, update: false, create: false };

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
