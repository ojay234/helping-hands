import { ErrorMessage, Field } from "formik";
import styled from "styled-components";

function CustomInput({
  name,
  type,
  label,
  placeholder,
  icon: Icon,
  reverse,
  iconClicked,
}) {
  return (
    <StyledInputContainer
      icon={Icon}
      reverse={reverse}
      className="flex flex-col gap-1"
    >
      <label>{label}</label>
      <div className="input-container">
        {Icon && (
          <IconContainer
            onClick={iconClicked}
            className={`${reverse && "cursor-pointer"}`}
          >
            {<Icon size="1.2rem" />}
          </IconContainer>
        )}
        <Field name={name} type={type} placeholder={placeholder} />
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
  }

  .input-container {
    position: relative;
    border: 1px solid #cdcdcd;
    display: flex;
    flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
    align-items: center;
    width: 100%;
    border-radius: 12px;
    padding: 12px 15px;
  }

  input {
    outline: none;
    border: none;
    margin-left: ${(props) => (props.icon && !props.reverse ? "25px" : "0")};
    width: 100%;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  color: #818181;
`;

export default CustomInput;
