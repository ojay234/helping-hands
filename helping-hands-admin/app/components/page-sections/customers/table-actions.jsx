"use client";
import { useState } from "react";
import { Modal } from "antd";
import deleteIcon from "@assets/icon/trash.svg";
import Image from "next/image";
import { useDeleteCustomerMutation } from "@/app/api/apiSlice";

function DeleteAction({ id, refetchData }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteCustomer, { isError, isLoading }] = useDeleteCustomerMutation();

  function showModal() {
    setModalVisible(true);
  }

  const handleCancel = (e) => {
    e.stopPropagation();
    setModalVisible(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    showModal();
  };

  const deleteCustomerHandler = async () => {
    try {
      const response = await deleteCustomer(id);
      setModalVisible(false);
      toast(<span className="text-green-500">Order deleted sucessfully</span>, {
        hideProgressBar: true,
        position: "top-center",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button className="text-right cursor-pointer" onClick={handleDelete}>
        <Image
          src={deleteIcon}
          width={24}
          height={24}
          alt="delete"
          className="mx-auto"
        />
      </button>
      <Modal open={modalVisible} onCancel={handleCancel} footer={null} centered>
        <div className="flex flex-col gap-3">
          <p className="text-center">
            Are you sure you want to delete this customer
          </p>
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
              onClick={deleteCustomerHandler}
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
