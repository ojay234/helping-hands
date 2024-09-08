"use client";
import { useState } from "react";
import { Modal } from "antd";
import deleteIcon from "@assets/icon/trash.svg";
import Image from "next/image";
import { useAdminAccessMutation } from "@/app/api/apiSlice";
import { toast } from "react-toastify";

function TableAction({ adminItem, refetch }) {
  const [modalAccessVisible, setModalAccessVisible] = useState(false);
  const [adminAccess, { isLoading }] = useAdminAccessMutation();

  function showAccessModal() {
    setModalAccessVisible(true);
  }

  const handleAccessCancel = () => {
    setModalAccessVisible(false);
  };

  const toggleAccess = async () => {
    const { adminId } = adminItem || {};
    const body = {
      admin_id: adminId,
      _method: "PATCH",
    };
    try {
      const response = await adminAccess(body);
      handleCancel();
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

  return (
    <>
      <div className="flex items-center gap-3 w-fit mx-auto">
        <button
          className=" p-1 px-2 rounded-lg text-yellow_500 border-2 border-yellow_500 text-sm"
          onClick={showAccessModal}
        >
          {adminItem?.status === "1" ? "Remove Access" : "Give Access"}
        </button>
      </div>
      <Modal
        open={modalAccessVisible}
        onCancel={handleAccessCancel}
        footer={null}
        centered
      >
        <div className="flex flex-col gap-3">
          <p className="text-center">
            {`  Are you sure you want ${
              adminItem?.status === "1" ? "remove" : "give"
            } admin accesss`}
          </p>
          <div className="flex gap-4  mx-auto w-fit">
            <button
              className="bg-blue_400 p-1 px-4 rounded-lg text-white"
              onClick={handleAccessCancel}
            >
              No
            </button>
            <button
              className=" p-1 px-4 rounded-lg text-red_500 border-2 border-red_500"
              onClick={toggleAccess}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TableAction;
