import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";
import BasicPagination from "./BasicPagination";
import TableLoader from "./table-skeleton-loader";

function Table({
  columns,
  data,
  styledHeader,
  onRowClick,
  pagination,
  isLoading,
  paginationData,
  onPageChange,
}) {
  // Create a table instance using the useTable hook with pagination
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the table UI
  return (
    <TableContainer>
      <div>
        <table {...getTableProps()}>
          <thead className={`${styledHeader && "bg-gray_100"}`}>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th {...column.getHeaderProps()} key={index}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {isLoading && (
              <tr>
                <td className="text-gray-500">loading...</td>
              </tr>
            )}

            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={index}
                  onClick={() => onRowClick && onRowClick(row.original)}
                  style={{ cursor: onRowClick && "pointer" }}
                  className={`${onRowClick && "hover:bg-gray-100"}`}
                >
                  {row.cells.map((cell, index) => {
                    return (
                      <td {...cell.getCellProps()} key={index}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {!isLoading && data?.length === 0 && (
              <tr>
                <td className="text-gray-500">No Data</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination controls if pagination is enabled */}
        {pagination && data?.length !== 0 && (
          <div>
            <BasicPagination
              paginationData={paginationData}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </TableContainer>
  );
}

const TableContainer = styled.div`
  table {
    width: 100%;
    table-layout: auto;

    thead {
      color: #818181;
      font-size: 14px;
      font-weight: 600;
    }

    tr {
      border-bottom: 1px solid #cdcdcd80;

      td,
      th {
        padding: 16px 4px;
        text-align: center;
      }
    }
  }

  .empty-table {
    margin: 10px auto;
    text-align: center;
    color: #818181;
    width: fit-content;
  }
`;

export default Table;
