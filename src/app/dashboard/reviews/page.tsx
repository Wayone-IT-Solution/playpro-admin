"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "Feedback ID", sortable: true },
  { key: "userFirstName", label: "First Name", sortable: true, key2: "userLastName" },
  { key: "userEmail", label: "Email", sortable: true },
  { key: "groundName.en", label: "Ground Name", sortable: true },
  { key: "groundAddress.en", label: "Ground Address", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    isMultiPurpose: true,
    multiPurposeProps: { type: "select", options: ["active", "inactive"] },
  },
  {
    key: "ratings.cleanliness",
    label: "Cleanliness",
    sortable: true,
  },
  {
    key: "ratings.maintenance",
    label: "Maintenance",
    sortable: true,
  },
  {
    key: "ratings.staffBehavior",
    label: "Staff Behavior",
    sortable: true,
  },
  {
    key: "ratings.valueForMoney",
    label: "Value for Money",
    sortable: true,
  },
  {
    key: "ratings.groundCondition",
    label: "Ground Condition",
    sortable: true,
  },
  {
    key: "ratings.overallExperience",
    label: "Overall Experience",
    sortable: true,
  },
  {
    key: "createdAt",
    label: "Submitted On",
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
  const formType = "Reviews";
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
