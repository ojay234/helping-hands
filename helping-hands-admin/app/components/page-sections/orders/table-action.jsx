"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import deleteIcon from "@assets/icon/trash.svg";
import Image from "next/image";
import { useDeleteOrderMutation } from "@/app/api/apiSlice";
import { toast } from "react-toastify";

function DeleteAction({ id }) {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteOrder, { isError, isLoading, isSuccess }] =
    useDeleteOrderMutation();

  function showModal() {
    setModalVisible(true);
  }

  const deleteOrderHandler = async () => {
    try {
      const response = await deleteOrder(id);
      setModalVisible(false);
      router.push(`/admin/orders/details`);
      toast(<span className="text-green-500">Order deleted sucessfully</span>, {
        hideProgressBar: true,
        position: "top-center",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <span className="text-right cursor-pointer" onClick={showModal}>
        <Image
          src={deleteIcon}
          width={24}
          height={24}
          alt="delete"
          className="mx-auto"
        />
      </span>
      <Modal open={modalVisible} onCancel={handleCancel} footer={null} centered>
        <div className="flex flex-col gap-3">
          <p>Are you sure you want to delete this order</p>
          {isLoading && (
            <p className="text-sm text-gray-300 text-center">loading...</p>
          )}
          <div className="flex gap-4  mx-auto w-fit">
            <button
              className="bg-blue_400 p-1 px-4 rounded-lg text-white"
              onClick={handleCancel}
            >
              No
            </button>
            <button
              className=" p-1 px-4 rounded-lg text-red_500 border-2 border-red_500"
              onClick={deleteOrderHandler}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DeleteAction;
