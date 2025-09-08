"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  {
    key: "name.en",
    label: "Ground Name (EN)",
    sortable: true,
    image: true,
    imageWithKey: "images[0]",
  },
  {
    key: "name.ar",
    label: "اسم الملعب (AR)",
    sortable: true,
    image: true,
    imageWithKey: "images[0]",
  },
  { key: "address.en", label: "Location (EN)", sortable: true },
  { key: "address.ar", label: "الموقع (AR)", sortable: true },
  { key: "type.en", label: "Ground Type (EN)", sortable: true },
  { key: "type.ar", label: "نوع الملعب (AR)", sortable: true },
  { key: "pitchType.en", label: "Pitch Type (EN)", sortable: true },
  { key: "firstName", label: "Owner Name", sortable: true },
  { key: "email", label: "Owner Email", sortable: true },
  { key: "mobile", label: "Contact Number", sortable: true },
  {
    key: "status",
    label: "Current Status",
    sortable: true,
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
  { key: "pricePerHour", label: "Price (In SAR)", sortable: true, prefix: "SAR " },
  {
    key: "createdAt",
    label: "Date of Registration",
    sortable: true,
    isDateTime: true,
  },
  {
    key: "updatedAt",
    label: "Last Modified",
    sortable: true,
    isDateTime: true,
  },
];

const filterOptions = [
  { label: "Ground Name", value: "name" },
  { label: "Location", value: "address" },
  { label: "Ground Type", value: "type" },
  { label: "Owner Name", value: "firstName" },
  { label: "Owner Email", value: "email" },
  { label: "Contact Number", value: "mobile" },
  { label: "Current Status", value: "status" },
  { label: "Price (In SAR)", value: "pricePerHour" }
];

const Page: React.FC = () => {
  const formType = "Ground Listing";
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
