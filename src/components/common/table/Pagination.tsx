import { debounce } from "@/hooks/general";

interface Paginate {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

interface PaginationProps {
  paginate: Paginate;
  fetchFilteredData: (params: { page: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  paginate,
  fetchFilteredData,
}) => {
  return (
    <div className="flex bg-whiteBg p-4 rounded-2xl justify-between items-center mt-3">
      <button
        onClick={debounce(
          () => fetchFilteredData({ page: paginate.currentPage - 1 }),
          100
        )}
        disabled={Number(paginate.currentPage) === 1}
        className="border border-infobg text-sm text-iconBlack hover:bg-infobg rounded-md px-4 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      <span className="font-semibold text-xs text-iconBlack">
        Showing {(paginate.currentPage - 1) * paginate.itemsPerPage + 1} to{" "}
        {paginate.totalItems < paginate.itemsPerPage * paginate.currentPage
          ? paginate.totalItems
          : paginate.itemsPerPage * paginate.currentPage}{" "}
        of {paginate.totalItems} entries
      </span>
      <button
        onClick={debounce(
          () => fetchFilteredData({ page: paginate.currentPage + 1 }),
          100
        )}
        disabled={Number(paginate.currentPage) === Number(paginate.totalPages)}
        className="border border-infobg text-sm hover:bg-infobg hover:text-iconBlack text-iconBlack rounded-md px-4 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
