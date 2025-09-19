"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
    {
        image: true,
        key: "name.en",
        sortable: true,
        imageWithKey: "imageUrl",
        label: "Academy Name (EN)",
    },
    {
        image: true,
        key: "name.ar",
        sortable: true,
        imageWithKey: "imageUrl",
        label: "Academy Name (AR)",
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
        sortable: true,
        isMultiPurpose: true,
        label: "Active Status?",
        multiPurposeProps: { type: "label" },
    },
];


const filterOptions = [
    { label: "Name (EN)", value: "name.en" },
    { label: "Name (AR)", value: "name.ar" },
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
