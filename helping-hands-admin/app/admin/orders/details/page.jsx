"use client";
import React, { Suspense } from "react";
import OrderDetails from "./details";

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetails />
    </Suspense>
  );
}

export default page;
