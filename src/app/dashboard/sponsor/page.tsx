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
    key: "name.en",
    label: "Sponsor Name (EN)",
    imageWithKey: "logo", // show sponsor logo beside English name
  },
  {
    image: true,
    key: "name.ar",
    label: "اسم الراعي (AR)",
    imageWithKey: "logo", // show sponsor logo beside Arabic name
  },
  {
    key: "website",
    label: "Website",
    isLink: true, // optional — for rendering clickable URLs
    sortable: true,
  },
  {
    key: "description.en",
    label: "Description (EN)",
    sortable: false,
  },
  {
    key: "description.ar",
    label: "الوصف (AR)",
    sortable: false,
  },
  {
    key: "isActive",
    label: "Status",
    sortable: true,
    isMultiPurpose: true,
    multiPurposeProps: {
      type: "label", // could render green/red label
    },
  },
  {
    key: "order",
    label: "Display Order",
    sortable: true,
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
  { label: "Status", value: "isActive" },
];

const Page: React.FC = () => {
  const formType = "Sponsor";
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
