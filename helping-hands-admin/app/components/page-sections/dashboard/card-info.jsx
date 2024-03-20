import Image from "next/image";
import React from "react";
import plusLine from "@assets/icon/plus-line.svg";
import minusLine from "@assets/icon/minus-line.svg";
import styled from "styled-components";

function CardInfo({ title, figure, percentage, date }) {
  return (
    <CardContainer className="w-[46%]">
      <h1>{figure}</h1>
      <p>{title}</p>
      <div className="flex justify-between gap-2 mt-3">
        <div>
          <h3>{percentage}</h3>
          <p>{date}</p>
        </div>
        <div>
          {percentage.includes("+") ? (
            <Image src={plusLine} width={90} height={15} alt="positive" />
          ) : (
            <Image src={minusLine} width={90} height={15} alt="negative" />
          )}
        </div>
      </div>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background: linear-gradient(to right, #d2daea80, #d2daea);
  padding: 10px 15px;
  border-radius: 12px;
  box-shadow: 4px 4px 12px #6a85b81a;
  h1 {
    font-size: 28px;
    font-weight: 600;
  }
  h3 {
    font-size: 20px;
  }
  p {
    color: #04040440;
  }
`;

export default CardInfo;
