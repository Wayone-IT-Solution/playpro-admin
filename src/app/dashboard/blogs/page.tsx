"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  {
    image: true,
    key: "title",
    label: "Blog Title",
    imageWithKey: "imageUrl",
  },
  {
    key: "slug",
    label:" Slug",
    sortable: true,
  },
  {
     key: "categoryName",
     label:" Category Name",
     sortable: true,
  },
  {
    key: "isActive",
    sortable: true,
    label: "Status",
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
  {
    key: "createdAt",
    label: "Created On",
    isDateTime: true,
    sortable: true,
  },
  {
    key: "updatedAt",
    label: "Last Updated On",
    isDateTime: true,
    sortable: true,
  },
];

const filterOptions = [
  { label: "Name", value: "userName" },
  { label: "Email", value: "userEmail" },
  { label: "Mobile", value: "userMobile" },
  { label: "Status", value: "status" },
];

const Page: React.FC = () => {
  const formType = "Blog";
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
