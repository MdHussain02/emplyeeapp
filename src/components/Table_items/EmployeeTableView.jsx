import React from "react";
import EmployeeTableDisplay from "./EmployeeTableDisplay";
import TablePagination from "./TablePagination";

const EmployeeTableView = ({ table, pagination, searchParams, setSearchParams }) => {
  const totalRows =
    pagination?.total || table.getPrePaginationRowModel().rows.length;
  const pageSize =
    pagination?.per_page || table.getState().pagination.pageSize;
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages =
    pagination?.last_page || Math.ceil(totalRows / pageSize);

  const handlePageChange = (page) => setSearchParams({ page });

  return (
    <div className="container">
      <EmployeeTableDisplay table={table} />
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EmployeeTableView;
