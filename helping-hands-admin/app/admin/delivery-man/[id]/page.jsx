"use client";
import React, { Suspense } from "react";

import DeliveryManOrderDetails from "./DeliveryMan";

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DeliveryManOrderDetails />
    </Suspense>
  );
}

export default page;
