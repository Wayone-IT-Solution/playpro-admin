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
    key: "title.en",
    label: "Blog Title (EN)",
    imageWithKey: "imageUrl",
  },
  {
    image: true,
    key: "title.ar",
    label: "Blog Title (AR)",
    imageWithKey: "imageUrl",
  },
  {
    key: "slug",
    label: " Slug",
    sortable: true,
  },
  {
    key: "categoryNameEN",
    label: " Category Name (EN)",
    sortable: true,
  },
  {
    key: "categoryNameAR",
    label: " Category Name (AR)",
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
  { label: "Blog Title", value: "title" },
  { label: "Slug", value: "slug" },
  { label: "Category", value: "categoryName" },
  { label: "Status", value: "isActive" },
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
