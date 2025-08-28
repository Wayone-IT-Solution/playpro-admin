"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "name", label: "Brand", imageWithKey: "imageUrl" },
  { key: "description", label: "Description", sortable: true },
  { key: "country", label: "Country", sortable: true },
  { key: "establishedYear", label: "Established Year", sortable: true },
  {
    key: "isActive",
    label: "Status",
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
  { key: "createdAt", label: "Created At", sortable: true, isDate: true },
  { key: "updatedAt", label: "Updated At", sortable: true, isDate: true },
];

const filterOptions = [
  { label: "Name", value: "name" },
  { label: "Desc.", value: "description" },
];

const Contacts: React.FC = () => {
  const formType = "Brands";
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
