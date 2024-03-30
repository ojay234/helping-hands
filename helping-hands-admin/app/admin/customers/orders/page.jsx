"use client";
import React, { Suspense } from "react";
import Orders from "./orders";

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Orders />
    </Suspense>
  );
}

export default page;
