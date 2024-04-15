"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import deleteIcon from "@assets/icon/trash.svg";
import Image from "next/image";
import {
  useDeleteFaqMutation,
  useDeleteOrderMutation,
  useUpdateFaqMutation,
} from "@/app/api/apiSlice";
import { TbCategory, TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import CustomSelect from "../../common/custom-select";
import CustomInput from "../../common/custom-input";
import CustomTextarea from "../../common/custom-textarea";
import CustomButton from "../../common/custom-button";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { BsTextareaT } from "react-icons/bs";
import { categoryOptions } from "@/app/data";

import * as Yup from "yup";

function ActionButtons({ faqItem, refetch }) {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalState, setModalState] = useState("edit");
  const [deleteFaq, { isDeleteError, isDeleteLoading, isDeleteSuccess }] =
    useDeleteFaqMutation();
  const [updateFaq, { isEditLoading, isEditError, isSuccess: isEditSuccess }] =
    useUpdateFaqMutation();

  function showModal(modal) {
    setModalState(modal);
    setModalVisible(true);
  }

  const deleteFaqHandler = async () => {
    const { id } = faqItem || {};
    try {
      const response = await deleteFaq(id);

      if (response?.data?.status) {
        handleCancel();
        toast(<span className="text-green-500">FAQ deleted sucessfully</span>, {
          hideProgressBar: true,
          position: "top-center",
        });
      } else {
        toast(<span className="text-red-500">Something went wrong</span>, {
          hideProgressBar: true,
          position: "top-center",
        });
      }
    } catch (err) {
      console.log(err);
    }
    refetch();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const initialValues = {
    category: faqItem?.category,
    question: faqItem?.question,
    answer: faqItem?.answer,
  };

  const FaqValidationSchema = Yup.object().shape({
    category: Yup.string().required("Required"),
    question: Yup.string().required("Required"),
    answer: Yup.string().required("Required"),
  });

  const submitFaq = async (values) => {
    const { id } = faqItem || {};
    const body = {
      ...values,
      _method: "PATCH",
    };
    try {
      const response = await updateFaq({ body, id });
      if (response?.data?.status) {
        handleCancel();
        toast(<span className="text-green-500">FAQ updated sucessfully</span>, {
          hideProgressBar: true,
          position: "top-center",
        });
      } else {
        toast(<span className="text-red-500">Something went wrong</span>, {
          hideProgressBar: true,
          position: "top-center",
        });
      }
    } catch (err) {
      console.log(error);
    }
    refetch();
  };

  return (
    <>
      <div className="flex gap-3 items-center">
        <button
          className="text-right cursor-pointer"
          onClick={() => showModal("edit")}
        >
          <TbEdit size="1.2rem" />
        </button>
        <button
          className="text-right cursor-pointer"
          onClick={() => showModal("delete")}
        >
          <Image
            src={deleteIcon}
            width={18}
            height={18}
            alt="delete"
            className="mx-auto"
          />
        </button>
      </div>

      <Modal open={modalVisible} onCancel={handleCancel} footer={null} centered>
        {modalState === "edit" ? (
          <Formik
            initialValues={initialValues}
            validationSchema={FaqValidationSchema}
            onSubmit={submitFaq}
          >
            {({ isValid }) => (
              <Form>
                <div className="flex justify-between gap-3 w-full">
                  <div className="w-1/2">
                    <CustomSelect
                      label="Category"
                      name="category"
                      options={categoryOptions}
                      icon={TbCategory}
                    />
                  </div>
                  <div className="w-1/2">
                    <CustomInput
                      label="Question"
                      placeholder="How to go offline"
                      icon={IoIosHelpCircleOutline}
                      type="text"
                      name="question"
                    />
                  </div>
                </div>
                <div className="w-full my-4">
                  <CustomTextarea
                    label="Answer"
                    placeholder="How to go offline"
                    icon={BsTextareaT}
                    name="answer"
                    type="text"
                  />
                </div>
                <div className="max-w-[200px] my-8 mx-auto">
                  <CustomButton
                    primary
                    type="submit"
                    isLoading={isEditLoading}
                    disabled={!isValid || isEditLoading}
                  >
                    Update FAQS
                  </CustomButton>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-center">
              Are you sure you want to delete this FAQ
            </p>
            {isDeleteLoading && (
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
                onClick={deleteFaqHandler}
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default ActionButtons;
