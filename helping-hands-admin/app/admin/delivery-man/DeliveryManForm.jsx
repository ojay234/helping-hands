"use client";
import { useEffect, useState } from "react";
import { useCreateDeliveryManMutation } from "@/app/api/apiSlice";

import CustomButton from "@/app/components/common/custom-button";
import { deliveryManStatusCategory } from "@/app/data";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Modal } from "antd";
import CustomInput from "@/app/components/common/custom-input";
import CustomSelect from "@/app/components/common/custom-select";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const initialValues = {
  deliveryman_name: "",
  deliveryman_phone_number: "",
  deliveryman_email_address: "",
  deliveryman_status: deliveryManStatusCategory[0]?.value,
  deliveryman_password: "",
};

const deliveryManValidationSchema = Yup.object().shape({
  deliveryman_name: Yup.string().required("Required"),
  deliveryman_phone_number: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  deliveryman_email_address: Yup.string().required("Required"),
  deliveryman_status: Yup.string().required("Required"),
  deliveryman_password: Yup.string().required("Required"),
});

function DeliveryManForm({
  setPageIndex,
  refetch,
  modalVisible,
  setModalVisible,
  showModal,
  handleCancel,
}) {
  const [
    createDeliveryMan,
    {
      isLoading: isCreateDeliveryManLoading,
      isError: isCreatingDeliveryManError,
    },
  ] = useCreateDeliveryManMutation();

  const handleFilter = (from, to) => {
    setFilter(`filter[date][from]=${from}&filter[date][to]=${to}`);
  };

  const onPageChange = (label) => {
    setPageIndex(label);
  };

  const refetchData = () => {
    refetch();
  };

  const submitDeliveryMan = async (values) => {
    try {
      const response = await createDeliveryMan(values);
      if (response?.data?.status) {
        setModalVisible(false);
        refetchData();
        setPageIndex(1);
        toast(
          <span className="text-green-500">
            Delivery Man created sucessfully
          </span>,
          {
            hideProgressBar: true,
            position: "top-center",
          }
        );
      } else {
        console.log({ response });
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
      {" "}
      <Modal
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={650}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={deliveryManValidationSchema}
          onSubmit={submitDeliveryMan}
        >
          {({ isValid }) => (
            <Form>
              <div className="flex  flex-wrap items-center justify-between gap-3 w-full">
                <div className="w-[45%]">
                  <CustomInput
                    label="Name"
                    placeholder="Name"
                    type="text"
                    name="deliveryman_name"
                  />
                </div>
                <div className="w-[45%]">
                  <CustomInput
                    label="Phone"
                    placeholder="Phone"
                    type="text"
                    name="deliveryman_phone_number"
                  />
                </div>
                <div className="w-[45%]">
                  <CustomInput
                    label="Email"
                    placeholder="Email"
                    type="text"
                    name="deliveryman_email_address"
                  />
                </div>
                <div className="w-[45%]">
                  <CustomSelect
                    label="Status"
                    name="deliveryman_status"
                    options={deliveryManStatusCategory}
                  />
                </div>
                <div className="w-[45%]">
                  <CustomInput
                    label="Password"
                    placeholder="Password"
                    type="password"
                    name="deliveryman_password"
                  />
                </div>
              </div>

              <div className="max-w-[200px] my-8 mx-auto">
                <CustomButton
                  primary
                  clicked={showModal}
                  type="submit"
                  isLoading={isCreateDeliveryManLoading}
                  // disabled={!isValid || isLoading}
                >
                  Submit
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}

export default DeliveryManForm;
