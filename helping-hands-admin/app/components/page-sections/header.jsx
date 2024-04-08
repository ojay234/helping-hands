import styled from "styled-components";
import CustomButton from "@components/common/custom-button";
import { useState } from "react";

function Header({ title, filter, handleFilter }) {
  // State variables to hold the input values and error message
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState("");

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
      setError("From date must be lower than to date.");
    } else if (threeMonthsLater < toDateObj) {
      setError("Date range cannot be more than three months.");
    } else {
      // Reset error state if validation passes
      setError("");
      // Proceed with filtering or any other action

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

          <CustomButton type="submit" primary width="90px">
            Filter
          </CustomButton>
          <div>{error && <ErrorMessage>{error}</ErrorMessage>}</div>
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
    color: #cdcdcd;
    max-width: 130px;
    font-size: 14px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1opx;
`;

export default Header;
