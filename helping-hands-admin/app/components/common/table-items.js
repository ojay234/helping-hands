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

export function formatAmount(amount) {
  return (
    <span
      className={`${
        amount.includes("-") ? "text-red_500" : " text-green_600"
      } font-bold`}
    >
      {amount}
    </span>
  );
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  // Extract day, month, and year
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Month is zero-based
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return <span>{formattedDate}</span>;
}

export function formatTimeStampDate(dateString) {
  const milliseconds = dateString * 1000;

  // Create a new Date object
  const dateObject = new Date(milliseconds);

  // Extract year, month, and day from the date object
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed, so add 1
  const day = dateObject.getDate().toString().padStart(2, "0");

  // Format the date as "yyyy-mm-dd"
  const formattedDate = `${year}-${month}-${day}`;
  return <span>{formattedDate}</span>;
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

export function formatLongText(text) {
  return <LongTextContainer>{text}</LongTextContainer>;
}

const LongTextContainer = styled.div`
  max-width: 500px !important;
  font-size: 14px;
`;

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
