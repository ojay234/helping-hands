"use client";
import React from "react";
import styled from "styled-components";
import MiniLoader from "./mini-loader";

function CustomButton({
  children,
  primary = true,
  width,
  clicked,
  type,
  disabled = false,
  btnLoading = false,
}) {
  return (
    <StyledButton
      primary={primary}
      onClick={clicked}
      type={type}
      disabled={disabled}
      width={width}
    >
      <p className="flex gap-2 items-center w-full justify-center">
        {btnLoading && <MiniLoader />}
        {children}
      </p>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background-color: ${(props) => (props.primary ? "#1F4894" : "transparent")};
  color: ${(props) => (props.primary ? "white" : "#040404")};
  border-radius: 6px;
  padding: 8px 15px;
  text-align: center;
  width: ${(props) => props.width || "100%"};
  border: ${(props) => (!props.primary ? "1px solid #1F4894" : "none")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${(props) => props.primary && "#8FA3C9"};
  }
`;

export default CustomButton;
