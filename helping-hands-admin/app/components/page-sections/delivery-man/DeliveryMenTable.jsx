import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@components/common/Table";
import { deliveryMenColumn } from "@/app/data";
import { FaStar } from "react-icons/fa";
import { useChangeDeliveryManStatusMutation } from "@/app/api/apiSlice";
import { toast } from "react-toastify";

function DeliveryMenTable({ data, isLoading, onPageChange, refetch }) {
  const router = useRouter();

  const [changeDeliveryManStatus, { isLoading: isStatusChangeLoading }] =
    useChangeDeliveryManStatusMutation();

  const toggleAccess = async (item) => {
    const { id, status } = item || {};
    const body = {
      deliveryman_id: id,
      deliveryman_account_status: status === "active" ? "disable" : "enable",
      _method: "PATCH",
    };
    try {
      const response = await changeDeliveryManStatus(body);

      if (response?.data?.status) {
        toast(
          <span className="text-green-500">access removed successfully</span>,
          {
            hideProgressBar: true,
            position: "top-center",
          }
        );
      } else {
        toast(<span className="text-red-500">Something went wrong</span>, {
          hideProgressBar: true,
          position: "top-center",
        });
      }
    } catch {}
    refetch();
  };

  const rowData = useMemo(() => {
    return data?.data?.map((item, index) => ({
      id: item.id,
      role: item.role,
      name: item.name,
      email: item.emailAddress,
      phone: item.phoneNumber,
      rating: (
        <div className="flex items-center m-auto w-fit text-xs  gap-1">
          {Array.from({ length: item.rating }, (_, i) => (
            <FaStar key={i} color="#ffd700" />
          ))}
        </div>
      ),
      status: item.status,
      action: (
        <button
          className={`text-white p-2 rounded-md  ${
            item.status === "active" ? "bg-red-500" : "bg-green-500"
          }`}
          onClick={() => toggleAccess(item)}
        >
          {item.status === "active" ? "Deactivate" : "Activate"}
        </button>
      ),
    }));
  }, [data]);

  const handleRowClick = (row) => {
    router.push(`/admin/delivery-man/${row.id}`);
  };

  const handleCellClick = (cell, event) => {
    if (cell.Header === "Action") {
      event.stopPropagation();
    }
  };

  return (
    <div className="bg-white">
      <Table
        columns={deliveryMenColumn}
        data={rowData || []}
        styledHeader
        pagination
        paginationData={data?.meta}
        onPageChange={onPageChange}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        onCellClick={handleCellClick}
      />
    </div>
  );
}

export default DeliveryMenTable;
