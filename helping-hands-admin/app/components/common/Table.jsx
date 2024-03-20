import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";

function Table({ columns, data }) {
  // Create a table instance using the useTable hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the table UI
  return (
    <TableContainer>
      <table {...getTableProps()}>
        <thead>
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
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index}>
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
        </tbody>
      </table>
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
      
      td, th {
        padding: 16px 4px;
        text-align: center;
      }
    }
  }
`;

export default Table;
