"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "Registration ID", sortable: true },
  { key: "child.name", label: "Child Name", sortable: true },
  { key: "child.address.city", label: "City", sortable: true },
  { key: "child.address.zipCode", label: "Zip Code" },

  // Parent / Guardian
  { key: "parentGuardian.name", label: "Parent/Guardian", sortable: true },
  { key: "parentGuardian.homePhone", label: "Home Phone" },

  // Fundraiser
  { key: "fundRaiser.choice", label: "Fundraiser Choice" },
  { key: "fundRaiser.amountPerBoxOrDonation", label: "Donation / Box Amt", isCurrency: true },

  // Internal Use
  { key: "internalUseOnly.paid", label: "Paid?", isBoolean: true },
  { key: "internalUseOnly.paymentMethod", label: "Payment Method" },
  { key: "internalUseOnly.combineNumber", label: "Combine #" },

  // Audit Info
  { key: "createdAt", label: "Registration Date", sortable: true, isDateTime: true },
  { key: "updatedAt", label: "Last Updated", sortable: true, isDateTime: true },
];

const filterOptions = [
  { label: "Child Name", value: "child.name" },
  { label: "Parent Name", value: "parentGuardian.name" },
  { label: "Parent Email", value: "parentGuardian.email" },
  { label: "Parent Phone", value: "parentGuardian.homePhone" },
  { label: "Grade", value: "child.enteringGrade" },
  { label: "Program Option", value: "costs.selectedOption" },
  { label: "Coach", value: "leagueInformation.preferredCoach" },
  { label: "Insurance Company", value: "insuranceInformation.insuranceCompany" },
  { label: "Payment Method", value: "internalUseOnly.paymentMethod" },
];

const Page: React.FC = () => {
  const formType = "Registrations";
  const { data, loading, error } = useFetch(endpoints[formType]?.url);
  const updatedData = data?.data?.result;
  const paginationData = data?.data?.pagination;
  let operationsAllowed = endpoints[formType]?.operations;
  operationsAllowed = { ...operationsAllowed, create: false, update: false };

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
