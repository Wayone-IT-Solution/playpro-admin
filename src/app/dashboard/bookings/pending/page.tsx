"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "Booking ID", sortable: true },
  { key: "userFirstName", label: "User Name", key2: "userLastName" },
  { key: "userEmail", label: "User Email ID" },
  { key: "userPhoneNumber", label: "User Number" },
  { key: "groundName.en", label: "Ground Name" },
  { key: "groundAddress.en", label: "Ground Address" },
  { key: "totalAmount", label: "Total Amt.", prefix: "SAR " },
  { key: "finalAmount", label: "Final Amt.", prefix: "SAR " },
  {
    key: "status",
    label: "Booking Status",
    sortable: true,
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
  {
    key: "paymentStatus",
    label: "Payment Status",
    sortable: true,
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
  {
    key: "createdAt",
    label: "Submitted On",
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
  { label: "User Name", value: "userFirstName" },
  { label: "Email ID", value: "userEmail" },
  { label: "Phone Number", value: "userPhoneNumber" },
  { label: "Ground Name", value: "groundName" },
  { label: "Ground Address", value: "groundAddress" },
];

const Page: React.FC = () => {
  const formType = "Pending Bookings";
  const { data, loading, error } = useFetch(endpoints[formType]?.url);
  const updatedData = data?.data?.result;
  const paginationData = data?.data?.pagination;
  let operationsAllowed = endpoints[formType]?.operations;
  operationsAllowed = {
    ...operationsAllowed,
    delete: false,
    update: false,
    create: false,
  };

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
