import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@components/common/Table";

import { FaStar } from "react-icons/fa";
import { useAssignDeliveryManOrderMutation } from "@/app/api/apiSlice";
import { toast } from "react-toastify";
import { assignableDeliveryManColumn } from "@/app/data";

function AssignableDeliveryMenTable({
  data,
  isLoading,
  onPageChange,
  refetch,
  orderId,
  handleCancel,
}) {
  const router = useRouter();

  const [assignDeliveryManOrder, { isLoading: isStatusChangeLoading }] =
    useAssignDeliveryManOrderMutation();

  const assignOrder = async (item) => {
    const { id } = item || {};
    const body = {
      deliveryman_id: id,
      order_id: orderId,
    };
    try {
      const response = await assignDeliveryManOrder(body);

      if (response?.data?.status) {
        toast(
          <span className="text-green-500">
            order assigned sucessfully successfully
          </span>,
          {
            hideProgressBar: true,
            position: "top-center",
          }
        );
        handleCancel();
      } else {
        toast(
          <span className="text-red-500">
            {response?.error?.data?.message || "Something went wrong"}
          </span>,
          {
            hideProgressBar: true,
            position: "top-center",
          }
        );
      }
    } catch {}
    refetch();
  };

  const rowData = useMemo(() => {
    return data?.data?.map((item, index) => ({
      num: index,
      name: item.name,
      email: item.emailAddress,
      phone: item.phoneNumber,
      status: item.status,
      action: (
        <button
          className="text-white p-2 rounded-md"
          onClick={() => assignOrder(item)}
          disabled={!orderAssignStatus}
        >
          Assign Order
        </button>
      ),
    }));
  }, [data]);

  const handleCellClick = (cell, event) => {
    if (cell.Header === "Action") {
      event.stopPropagation();
    }
  };

  return (
    <div className="bg-white">
      <Table
        columns={assignableDeliveryManColumn}
        data={rowData || []}
        styledHeader
        pagination
        paginationData={data?.meta}
        onPageChange={onPageChange}
        isLoading={isLoading}
        onCellClick={handleCellClick}
      />
    </div>
  );
}

export default AssignableDeliveryMenTable;
