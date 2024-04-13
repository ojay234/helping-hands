"use client";
import { Suspense } from "react";
import PaymentDetails from "./payment-details";

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentDetails />
    </Suspense>
  );
}

export default page;
