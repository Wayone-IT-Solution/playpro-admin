"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  {
    key: "_id",
    label: "Video ID",
  },
  {
    key: "minAmount",
    label: "Minimum Amount",
    fallback: "-",
    sortable: true,
  },
  {
    key: "maxAmount",
    label: "Maximum Amount",
    fallback: "-",
    sortable: true,
  },
  {
    key: "duration",
    label: "Duration (in seconds)",
    fallback: "-",
    suffix: "s",
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
  { label: "Min. Amt.", value: "minAmount" },
  { label: "Max. Amt.", value: "maxAmount" },
];

const Page: React.FC = () => {
  const formType = "Ad Video";
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
