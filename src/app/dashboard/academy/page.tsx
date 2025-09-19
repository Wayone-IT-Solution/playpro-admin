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
        label: "Name (EN)",
        sortable: true,
    },
    {
        key: "name.ar",
        label: "Name (AR)",
        sortable: true,
    },
    {
        key: "description.en",
        label: "Description (EN)",
        sortable: false,
    },
    {
        key: "description.ar",
        label: "Description (AR)",
        sortable: false,
    },
    {
        key: "sports",
        label: "Sports",
        sortable: false,
        isArray: true, 
    },
    {
        key: "ground",
        label: "Ground",
        sortable: true,
        isReference: true, 
        referenceKey: "name.en", 
    },
    {
        key: "coaches",
        label: "Coaches",
        sortable: false,
        isArray: true,
        isReference: true,
        referenceKey: "fullName", 
    },
    {
        key: "createdAt",
        label: "Created At",
        sortable: true,
        isDateTime: true,
    },
    {
        key: "updatedAt",
        label: "Last Updated",
        sortable: true,
        isDateTime: true,
    },
    {
        key: "status",
        label: "Status",
        sortable: true,
        isMultiPurpose: true,
        multiPurposeProps: {
            type: "label", 
            statusMap: {
                active: { color: "green", label: "Active" },
                inactive: { color: "orange", label: "Inactive" },
                closed: { color: "red", label: "Closed" },
            },
        },
    },
];


const filterOptions = [
    { label: "Name", value: "name" },
];

const Page: React.FC = () => {
    const formType = "Academy";
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
