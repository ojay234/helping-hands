"use client";
import { useState } from "react";
import { Modal } from "antd";
import deleteIcon from "@assets/icon/trash.svg";
import Image from "next/image";

function DeleteAction({ index }) {
  const [modalVisible, setModalVisible] = useState(false);

  function showModal() {
    setModalVisible(true);
  }

  const handleOk = () => {
    console.log("Deleting item at index:", index);
    setModalVisible(false);
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
      <Modal
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="flex flex-col gap-3">
          <p>Are you sure you want to delete this order</p>
          <div className="flex gap-4  mx-auto w-fit">
            <button
              className="bg-blue_400 p-1 px-4 rounded-lg text-white"
              onClick={handleCancel}
            >
              No
            </button>
            <button
              className=" p-1 px-4 rounded-lg text-red_500 border-2 border-red_500"
              onClick={handleOk}
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
