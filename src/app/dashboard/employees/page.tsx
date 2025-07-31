"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "User ID", sortable: true },
  { key: "username", label: "User Name", sortable: true },
  { key: "email", label: "Email Address", sortable: true },
  {key: "status", label: "Status", sortable :true, isMultiPurpose: true, multiPurposeProps: { type: "label" }} ,
  
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
  { label: " User Name", value: "username" },
  { label: "Email", value: "email" },
];

const Page: React.FC = () => {
  const formType = "Employee";
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
