// EmployeeTable.jsx
import React from "react";
import { useEmployeeData } from "./hooks/useEmployeeData";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import EmployeeTableView from "./EmployeeTableView";
import { useSearchParams, Link } from "react-router-dom";

const EmployeeTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const tableConfig = {
    page: pageParam,
    length: 10,
    sort_order: "asc",
    sort_by: "name",
  };

  const { data,  error, pagination, isValidating } = useEmployeeData(tableConfig);

  const tableData = data || [];

  const columns = [
    { accessorKey: "employee_code", header: "Employee Id" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Mobile" },
    {
      id: "designation",
      header: "Designation",
      cell: ({ row }) => row.original.designation?.title || "",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Link className="btn btn-primary" to={`/employee/${row.original.id}`}>
          View Details
        </Link>
      ),
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      pagination: { pageIndex: pageParam - 1, pageSize: tableConfig.length },
    },
  });

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Failed to load employees. Please try again.
      </div>
    );
  }

  return (
    <div className="position-relative">
      {/* Blur the table view if revalidation is in progress */}
      <div className={isValidating ? "blur" : ""}>
        <EmployeeTableView
          key={`table-${pageParam}`}
          table={table}
          pagination={pagination}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
      {/* Show a loading overlay if new data is being fetched */}
      {isValidating && (
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{ zIndex: 10 }}
        >
          <button className="btn btn-primary" disabled>
            Loading...
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
