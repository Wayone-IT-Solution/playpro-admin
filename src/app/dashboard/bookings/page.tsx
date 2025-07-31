"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "Booking ID", sortable: true },
  { key: "userFirstName", label: "User First Name", sortable: true },
  { key: "userLastName", label: "User Last Name", sortable: true },
  { key: "userEmail", label: "User Email", sortable: true },
  { key: "userPhoneNumber", label: "User Phone Number", sortable: true },
  { key: "groundName", label: "Ground Name", sortable: true },
  { key: "groundAddress", label: "Ground Address", sortable: true },
  {
    key: "groundLocation.coordinates",
    label: "Ground Coordinates (Lng, Lat)",
    sortable: false, // optional: sorting may not make sense here
  },
  { key: "numberOfGuests", label: "No. of Guests", sortable: true },
  { key: "totalAmount", label: "Total Amount (₹)", sortable: true },
  { key: "finalAmount", label: "Final Amount (₹)", sortable: true },
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
  { label: "Emp. ID", value: "_id" },
  { label: "Name", value: "username" },
  { label: "Email", value: "email" },

];

const Page: React.FC = () => {
  const formType = "Bookings";
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
