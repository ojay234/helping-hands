"use client";
import { useRouter } from "next/navigation";
import {
  useCreateDeliveryManMutation,
  useDeleteDeliveryManMutation,
  useUpdateDeliveryManMutation,
} from "@/app/api/apiSlice";

import CustomButton from "@/app/components/common/custom-button";

import { toast } from "react-toastify";
import { Modal } from "antd";
import styled from "styled-components";

function DeleteDeliveryMan({ deliveryManDetails, handleCancel, modalVisible }) {
  const { id, name } = deliveryManDetails || {};
  const router = useRouter();
  const [
    deleteDeliveryMan,
    {
      isLoading: isDeleteDeliveryManLoading,
      isError: isDeleteDeliveryManError,
    },
  ] = useDeleteDeliveryManMutation();

  const refetchData = () => {
    refetch();
  };

  const deleteDeliveryManHandler = async () => {
    try {
      const response = await deleteDeliveryMan(id);
      if (response?.data?.status) {
        handleCancel();
        router.push("/admin/delivery-man");
        toast(
          <span className="text-green-500">
            Delivery Man deleted sucessfully
          </span>,
          {
            hideProgressBar: true,
            position: "top-center",
          }
        );
      } else {
        toast(
          <span className="text-red-500">
            {response?.error?.data?.message || "Something went wrong"}{" "}
          </span>,
          {
            hideProgressBar: true,
            position: "top-center",
          }
        );
      }
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <div>
      <Modal
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={650}
      >
        <div className="text-center text-lg">
          Are you sure you want to delete{" "}
          <span className="font-bold">{name}</span>
        </div>

        <ButtonContainer className="flex my-8 mx-auto justify-center gap-7">
          <div className="max-w-[150px] edit-btn">
            <CustomButton primary clicked={handleCancel}>
              Back
            </CustomButton>
          </div>
          <div className="max-w-[150px] delete-btn">
            <CustomButton
              primary
              clicked={deleteDeliveryManHandler}
              type="button"
              isLoading={isDeleteDeliveryManLoading}
              disabled={isDeleteDeliveryManLoading}
            >
              Delete
            </CustomButton>
          </div>
        </ButtonContainer>
      </Modal>
    </div>
  );
}
const ButtonContainer = styled.div`
  .edit-btn {
    button {
      background-color: #cccccc !important;
      color: #2e2e2e;
    }
  }

  .delete-btn {
    button {
      background-color: red !important;
    }
  }
`;

export default DeleteDeliveryMan;
