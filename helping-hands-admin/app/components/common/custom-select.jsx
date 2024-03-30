import { ErrorMessage, Field } from "formik";
import styled from "styled-components";

function CustomSelect({ name, label, placeholder, options, icon: Icon }) {
  return (
    <StyledInputContainer icon={Icon}>
      <label>{label}</label>
      <div className="input-container">
        {Icon && <IconContainer>{<Icon size="1.2rem" />}</IconContainer>}
        <Field as="select" name={name} placeholder={placeholder}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      </div>
      <p className="text-xs text-red-400">
        <ErrorMessage name={name} component="div" />
      </p>
    </StyledInputContainer>
  );
}

const StyledInputContainer = styled.div`
  label {
    font-size: 16px;
    font-weight: 700;
    color: #818181;
    margin-bottom: 5px;
  }

  .input-container {
    position: relative;
    border: 1px solid #cdcdcd;
    align-items: center;
    width: 100%;
    border-radius: 12px;
    padding: 12px 15px;
  }

  select {
    outline: none;
    border: none;
    width: 100%;
    padding-left: 25px;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  color: #818181;
`;

export default CustomSelect;
