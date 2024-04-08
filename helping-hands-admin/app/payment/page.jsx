"use client";
import React, { Suspense } from "react";
import PaymentForm from "./payment-form";


function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentForm />
    </Suspense>
  );
}

export default page;
