import styled from "styled-components";
import deleteIcon from "@assets/icon/trash.svg";
import Image from "next/image";

export function formatStatus(status) {
  return (
    <StatusContainer status={status.toLowerCase()}>{status}</StatusContainer>
  );
}
export function formatStatusOrder(status) {
  return (
    <StatusOrderContainer status={status.toLowerCase()}>
      {status}
    </StatusOrderContainer>
  );
}

export function boldText(text) {
  return <span className="font-bold">{text}</span>;
}

export function deleteAction(index) {
  return (
    <span className="text-right cursor-pointer">
      <Image
        src={deleteIcon}
        width={24}
        height={24}
        alt="delete"
        className="mx-auto"
      />
    </span>
  );
}

const StatusContainer = styled.span`
  color: ${(props) =>
    props.status === "pending"
      ? "#FFC107"
      : props.status === "cancelled"
      ? "#FF0202"
      : props.status === "confirmed"
      ? "#4467A6"
      : "#12B76A"};
  font-size: 14px;
`;

const StatusOrderContainer = styled.span`
  background-color: ${(props) =>
    props.status === "pending"
      ? "#FFC107"
      : props.status === "cancelled"
      ? "#FF0202"
      : props.status === "confirmed"
      ? "#4467A6"
      : "#12B76A"};
  color: white;
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 14px;
`;
