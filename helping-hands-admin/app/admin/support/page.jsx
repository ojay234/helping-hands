"use client";
import { categoryOptions, supportQuestions } from "@/app/data";
import Header from "@components/page-sections/header";
import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CustomButton from "@/app/components/common/custom-button";
import { Modal } from "antd";
import CustomInput from "@/app/components/common/custom-input";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { Form, Formik } from "formik";
import CustomTextarea from "@/app/components/common/custom-textarea";
import FaqTable from "@/app/components/page-sections/support/faq-table";
import CustomSelect from "@/app/components/common/custom-select";
import { TbCategory } from "react-icons/tb";
import { useCreateFaqMutation, useGetFaqQuery } from "@/app/api/apiSlice";
import * as Yup from "yup";

function Support() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const {
    data,
    isLoading: isFaqDataLoading,
    refetch,
  } = useGetFaqQuery(pageIndex);
  const [createFaq, { isLoading, isError }] = useCreateFaqMutation();

  function showModal() {
    setModalVisible(true);
  }

  const handleCancel = () => {
    setModalVisible(false);
  };

  const initialValues = {
    category: categoryOptions[0]?.value,
    question: "",
    answer: "",
  };

  const FaqValidationSchema = Yup.object().shape({
    category: Yup.string().required("Required"),
    question: Yup.string().required("Required"),
    answer: Yup.string().required("Required"),
  });

  const submitFaq = async (values) => {
    try {
      const response = await createFaq(values);
      setModalVisible(false);
      refetch();
      setPageIndex(1);
    } catch (err) {
      console.log(error);
    }
  };

  const onPageChange = (label) => {
    setPageIndex(label);
  };
  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 py-6">
      <Header title="Support" />
      <div className="bg-white py-5 rounded-lg px-5 min-h-[85vh]">
        <div>
          <FaqTable
            data={data}
            isLoading={isFaqDataLoading}
            onPageChange={onPageChange}
          />
        </div>
        <div className="max-w-[200px] my-8 mx-auto">
          <CustomButton primary clicked={showModal}>
            Add FAQS
          </CustomButton>
        </div>
      </div>
      <Modal
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={650}
      >
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
                  icon={IoIosHelpCircleOutline}
                  name="answer"
                  type="text"
                />
              </div>
              <div className="max-w-[200px] my-8 mx-auto">
                <CustomButton
                  primary
                  clicked={showModal}
                  type="submit"
                  isLoading={isLoading}
                  // disabled={!isValid || isLoading}
                >
                  Add FAQS
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </section>
  );
}

const StyledSupportContainer = styled.div`
  display: flex;
  .header {
    display: flex;
    background-color: #d2d2d240;
    color: #818181;
    font-weight: 600;
    padding: 12px;
    border-radius: 8px;
    gap: 10px;
  }

  .body-row {
    display: flex;
    padding: 12px;
    gap: 10px;
    border-bottom: 1px solid #d0d0d080;
  }
`;

export default Support;
