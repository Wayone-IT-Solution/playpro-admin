"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "ID" },
  { key: "code", label: "Code", sortable: true },
  { key: "type", label: "Discount Type", sortable: true },
  { key: "discountValue", label: "Discount", sortable: true },
  // { key: "usageLimitPerUser", label: "User Limit", sortable: true },
  { key: "usageLimit", label: "Global Limit", sortable: true },
  { key: "startDate", label: "Start Date", isDate: true, sortable: true },
  { key: "endDate", label: "End Date", isDate: true, sortable: true },
  {
    key: "isPublic",
    sortable: true,
    isMultiPurpose: true,
    label: "Target Audience",
    multiPurposeProps: { type: "label" },
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
];

const filterOptions = [
  { label: "Code", value: "code" },
  { label: "Type", value: "type" },
  { label: "Status", value: "status" },
];

const Page: React.FC = () => {
  const formType = "Coupon";
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
