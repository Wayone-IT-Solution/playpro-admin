"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "ID", sortable: true },
  { key: "name.en", label: "Name (EN)", sortable: true },
  { key: "name.ar", label: "Name (AR)", sortable: true },
  { key: "description.en", label: "Description (EN)", sortable: true },
  { key: "description.ar", label: "Description (AR)", sortable: true },
  {
    label: "Parent (EN)",
    fallback: "-",
    key: "parentCategoryDetails.name.en",
  },
  {
    label: "Parent (AR)",
    fallback: "-",
    key: "parentCategoryDetails.name.ar",
  },
  {
    key: "status",
    label: "Current Status",
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
  { key: "createdAt", label: "Date Created", sortable: true, isDateTime: true },
  { key: "updatedAt", label: "Last Updated", sortable: true, isDateTime: true },
];

const filterOptions = [
  { label: "Name", value: "name" },
  { label: "Desc.", value: "description" },
];

const Contacts: React.FC = () => {
  const formType = "Products Category";
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

export default Contacts;
