"use client";
import styled from "styled-components";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const BasicPagination = ({ paginationData, onPageChange }) => {
  const { current_page, last_page, links } = paginationData || {};

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
    window.scrollTo(0, 0);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Always show the first page
    pageNumbers.push(renderPageNumber(1));

    // If there are more than 5 pages, add ellipsis after the first page

    if (last_page > 5 && current_page > 4) {
      pageNumbers.push(
        <li key="ellipsis-end" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    // Calculate the range of page numbers to display
    const startPage = Math.max(2, current_page - 2);
    const endPage = Math.min(last_page - 1, current_page + 2);

    // Render the range of page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(renderPageNumber(i));
    }

    // If there are more than 5 pages, add ellipsis before the last page
    if (last_page > 5 && current_page < last_page - 2) {
      pageNumbers.push(
        <li key="ellipsis-end" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    // Always show the last page
    if (last_page > 1) {
      pageNumbers.push(renderPageNumber(last_page));
    }

    return pageNumbers;
  };

  const renderPageNumber = (pageNumber) => {
    return (
      <li
        key={pageNumber}
        className={`page-num ${
          current_page === pageNumber ? "active-page-num" : ""
        }`}
      >
        <span
          onClick={() => {
            handlePageChange(pageNumber);
          }}
        >
          {pageNumber}
        </span>
      </li>
    );
  };

  return (
    <PaginationContainer>
      <ul className="pagination">
        {/* Previous button */}
        <li className={`${current_page === 1 ? "disabled-btn" : "page-btn"}`}>
          <span
          
            onClick={(e) => {
              handlePageChange(current_page - 1);
            }}
          >
            <MdOutlineKeyboardArrowLeft size="1.5rem" />
          </span>
        </li>

        {/* Page numbers */}
        {renderPageNumbers()}

        {/* Next button */}
        <li
          className={` ${
            current_page === last_page ? "disabled-btn" : "page-btn"
          }`}
        >
          <span
            className="page-link"
            onClick={() => {
              handlePageChange(current_page + 1);
            }}
          >
            <MdOutlineKeyboardArrowRight size="1.5rem" />
          </span>
        </li>
      </ul>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 10px 0;
  padding: 15px;
  ul {
    display: flex;
    align-items: center;
    gap: 15px;
    li {
      color: #818181;
    }
  }

  .page-btn {
    padding: 5px;
    border-radius: 4px;
    background-color: #d2d2d240;
    cursor: pointer;
  }
  .disabled-btn {
    padding: 5px;
    border-radius: 4px;
    cursor: not-allowed;
  }
  .page-num {
    padding: 5px 8px;
    border-radius: 4px;
    font-size: 14px;
  }
  .active-page-num {
    color: white;
    background-color: #1f4894;
  }
`;

export default BasicPagination;
