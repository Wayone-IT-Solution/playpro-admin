"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "Testimonial ID", sortable: true },
  { key: "name.en", label: "Name (EN)", sortable: true },
  { key: "name.ar", label: "Name (AR)", sortable: true },
  { key: "feedback.en", label: "Feedback (EN", sortable: false },
  { key: "feedback.ar", label: "Feedback (AR)", sortable: false },
  { key: "rating", label: "Rating", sortable: true },
  {
    key: "isVerified",
    label: "Verified",
    sortable: true,
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
  {
    key: "isActive",
    label: "Active",
    sortable: true,
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
  {
    key: "createdAt",
    label: "Submitted At",
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
  { label: "Name", value: "name" },
  { label: "Feedback", value: "feedback" },
];

const Page: React.FC = () => {
  const formType = "Testimonials";
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
