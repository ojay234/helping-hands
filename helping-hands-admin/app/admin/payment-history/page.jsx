"use client";
import { useState } from "react";
import HistoryTable from "@/app/components/page-sections/payment-history/historyTable";
import Header from "@components/page-sections/header";
import styled from "styled-components";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import {
  useGetBalanceQuery,
  useGetWalletHistoryQuery,
} from "@/app/api/apiSlice";

function PaymentHistory() {
  const [hideBalance, setHideBalance] = useState(false);
  const { data: balanceData, isLoading: isLoadingBalance } =
    useGetBalanceQuery();
  const getBalance = (type) => {
    if (type === "available") {
      const availableBalance = balanceData?.data?.available[0];
      const amount = availableBalance?.amount;
      const currency = availableBalance?.currency;
      if (currency?.includes("usd")) {
        return `$${amount}`;
      } else {
        return `${amount}${currency}`;
      }
    } else {
      const pendingBalance = balanceData?.data?.pending[0];
      const amount = pendingBalance?.amount;
      const currency = pendingBalance?.currency;
      if (currency?.includes("usd")) {
        return `$${amount}`;
      } else {
        return `${amount}${currency}`;
      }
    }
  };

  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 py-6">
      <Header title="Payment History" />
      <div className="bg-white py-5 rounded-lg">
        <CardContainer className="bg-blue_400  mx-auto text-white text-sm">
          <p className="bg-white p-2 text-black_400 rounded-lg  font-bold">
            <span>Pending balance:</span>{" "}
            <span>{balanceData ? getBalance("pending") : "_"}</span>
          </p>
          <p className="mt-6 mb-3 flex items-center gap-3 font-bold text-[32px]">
            {hideBalance ? (
              <span>*****</span>
            ) : (
              <span>{balanceData ? getBalance("available") : "_"}</span>
            )}

            {hideBalance ? (
              <span onClick={() => setHideBalance(false)}>
                <FaEyeSlash size="1.6rem" />
              </span>
            ) : (
              <span onClick={() => setHideBalance(true)}>
                <IoEyeSharp size="1.6rem" />
              </span>
            )}
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
