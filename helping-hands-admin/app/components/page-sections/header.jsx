import styled from "styled-components";
import CustomButton from "@components/common/custom-button";
import { useState } from "react";
import { toast } from "react-toastify";

function Header({ title, filter, handleFilter }) {
  // State variables to hold the input values and error message
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Function to handle form submission
  const handleFilterSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Convert input values to the format "yyyy-mm-dd"
    const formattedFromDate = fromDate
      ? fromDate.split("-").reverse().join("-")
      : "";
    const formattedToDate = toDate ? toDate.split("-").reverse().join("-") : "";

    // Validate date range
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    const threeMonthsLater = new Date(fromDate);
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

    if (fromDateObj >= toDateObj) {
      toast(
        <span className="text-red-500">
          From date must be lower than to date.
        </span>,
        {
          hideProgressBar: true,
          position: "top-center",
        }
      );
    } else if (threeMonthsLater < toDateObj) {
      toast(
        <span className="text-red-500">
          Date range cannot be more than three months.
        </span>,
        {
          hideProgressBar: true,
          position: "top-center",
        }
      );
    } else {
      handleFilter(formattedFromDate, formattedToDate);
    }
  };

  return (
    <div className="my-1 px-3 py-2 flex justify-between bg-white rounded-[8px] ">
      <h1 className="font-bold text-[28px]">{title}</h1>
      {filter && (
        <FilterContainer onSubmit={handleFilterSubmit}>
          <div className="flex gap-1 ">
            <label>From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="flex gap-1 ">
            <label>To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <CustomButton
            type="submit"
            primary
            width="90px"
            disabled={!fromDate || !toDate}
          >
            Filter
          </CustomButton>
        </FilterContainer>
      )}
    </div>
  );
}

const FilterContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  label {
    font-size: 14px;
    font-weight: 600;
    margin: auto 0;
    height: fit-content;
  }
  input {
    border: 1px solid #cdcdcd;
    border-radius: 6px;
    padding: 8px;
    outline: none;
    color: #000000;
    max-width: 130px;
    font-size: 14px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1opx;
`;

export default Header;
