"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";


const columns = [
  { key: "_id", label: "Cart ID", sortable: true },
  { key: "user.firstName", label: "First Name", sortable: true },
  { key: "user.lastName", label: "Last Name", sortable: true },
  { key: "user.email", label: "Email", sortable: true },
  { key: "user.phoneNumber", label: "Phone Number", sortable: true },
  { key: "totalAmount", label: "Total Amount", sortable: true },
  { key: "finalAmount", label: "Final Amount", sortable: true },
  { key: "createdAt", label: "Created Date", sortable: true, isDate: true },
  { key: "updatedAt", label: "Updated Date", sortable: true, isDate: true },
  {
    key: "items",
    label: "Items",
    isMultiPurpose: true,
    multiPurposeProps: { type: "array", displayKey: "product.name" }, // displays product names in items array
  },
];

const filterOptions = [
  { label: "First Name", value: "userDetails.firstName" },
  { label: "Last Name", value: "userDetails.lastName" },
  { label: "Email", value: "userDetails.email" },
  { label: "Phone", value: "userDetails.phoneNumber" },
];

const Contacts: React.FC = () => {
  const formType = "Carts";
  const { data, loading, error } = useFetch(endpoints[formType]?.url);
  const updatedData = data?.data?.result;
  const paginationData = data?.data?.pagination;
  let operationsAllowed = endpoints[formType]?.operations;
  operationsAllowed = { ...operationsAllowed, create: false, read: false };

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
