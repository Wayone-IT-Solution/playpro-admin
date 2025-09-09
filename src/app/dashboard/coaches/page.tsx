"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "name.en", label: "Name (EN)", sortable: true, image: true, imageWithKey: "profileImage" },
  { key: "name.ar", label: "Name (AR)", sortable: true },
  { key: "email", label: "Email Address", sortable: true },
  { key: "phoneNumber", label: "Phone Number", sortable: true },
  {
    key: "createdAt",
    sortable: true,
    isDateTime: true,
    label: "Registration Date",
  },
  {
    key: "updatedAt",
    label: "Last Updated",
    sortable: true,
    isDateTime: true,
  },
  {
    key: "status",
    sortable: true,
    label: "Active Status",
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
];

const filterOptions = [
  { label: "Name", value: "name" },
  { label: "Email", value: "email" },
  { label: "Mobile", value: "phoneNumber" },
];

const Page: React.FC = () => {
  const formType = "Coaches";
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

export default Page;
