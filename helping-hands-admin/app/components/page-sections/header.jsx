import styled from "styled-components";
import CustomButton from "@components/common/custom-button";

function Header({ title, filter }) {
  return (
    <div className="my-1 px-3 py-2 flex justify-between bg-white rounded-[8px] ">
      <h1 className="font-bold text-[28px]">{title}</h1>
      <FilterContainer>
        <div className="flex gap-1 ">
          <label>From</label>
          <input type="date" />
        </div>
        <div className="flex gap-1 ">
          <label>To</label>
          <input type="date" />
        </div>
        <div></div>
        <CustomButton type="submit" primary width="90px">
          Filter
        </CustomButton>
      </FilterContainer>
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

export default Header;
