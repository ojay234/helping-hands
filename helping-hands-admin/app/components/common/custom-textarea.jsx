import { ErrorMessage, Field } from "formik";
import styled from "styled-components";

function CustomTextarea({ name, type, label, placeholder, icon: Icon }) {
  return (
    <StyledInputContainer hasIcon={Icon}>
      <label>{label}</label>
      <div className="input-container">
        {Icon && <IconContainer>{<Icon size="1.2rem" />}</IconContainer>}
        <Field
          as="textarea"
          name={name}
          type={type}
          placeholder={placeholder}
        />
      </div>
      <p className="text-xs text-red-400">
        <ErrorMessage name={name} component="div" />
      </p>
    </StyledInputContainer>
  );
}

const StyledInputContainer = styled.div`
  label {
    font-size: 14px;
    font-weight: 700;
    color: #818181;
    margin-bottom: 5px;
  }

  .input-container {
    position: relative;
    border: 1px solid #cdcdcd;
    display: flex;
    align-items: flex-start;
    width: 100%;
    border-radius: 12px;
    padding: 12px 15px;
  }

  textarea {
    outline: none;
    border: none;
    margin-left: ${(props) => (props.hasIcon ? "25px" : "0")};
    width: 100%;
  }
`;

const IconContainer = styled.div`
  position: absolute;
`;

export default CustomTextarea;
