"use client";
import HistoryTable from "@/app/components/page-sections/payment-history/historyTable";
import Header from "@components/page-sections/header";
import styled from "styled-components";
import { IoEyeSharp } from "react-icons/io5";

function PaymentHistory() {
  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 py-6">
      <Header title="Payment History" />
      <div className="bg-white py-5 rounded-lg">
        <CardContainer className="bg-blue_400  mx-auto text-white text-sm">
          <p className="bg-white p-2 text-black_400 rounded-lg  font-bold">
            <span>Pending balance:</span> <span>$50.70</span>
          </p>
          <p className="mt-6 mb-3 flex items-center gap-3 font-bold text-[32px]">
            <span>$10,000</span>
            <span>
              <IoEyeSharp size="1.6rem" />
            </span>
          </p>
          <p>Available balance</p>
        </CardContainer>
        <div className="w-[90%] mx-auto">
          <h1 className="font-bold my-2">Transaction history</h1>
          <HistoryTable />
        </div>
      </div>
    </section>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  min-height: 250px;
  border-radius: 12px;
`;

export default PaymentHistory;
