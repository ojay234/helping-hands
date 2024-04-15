"use client";
import { useState } from "react";
import { Modal } from "antd";
import deleteIcon from "@assets/icon/trash.svg";
import Image from "next/image";
import { useAdminAccessMutation } from "@/app/api/apiSlice";
import { toast } from "react-toastify";

function TableAction({ adminItem, refetch }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [adminAccess, { isLoading }] = useAdminAccessMutation();

  function showModal() {
    setModalVisible(true);
  }

  const handleCancel = () => {
    setModalVisible(false);
  };

  const toggleAccess = async () => {
    const { adminId } = adminItem || {};
    try {
      const reponse = await adminAccess(adminId);
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
          className=" p-1 px-4 rounded-lg text-yellow_500 border-2 border-yellow_500"
          onClick={showModal}
        >
          Suspend
        </button>
      </div>
      <Modal open={modalVisible} onCancel={handleCancel} footer={null} centered>
        <div className="flex flex-col gap-3">
          <p className="text-center">Are you sure you want remove admin accesss</p>
          <div className="flex gap-4  mx-auto w-fit">
            <button
              className="bg-blue_400 p-1 px-4 rounded-lg text-white"
              onClick={handleCancel}
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
