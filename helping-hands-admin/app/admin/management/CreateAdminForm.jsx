"use client";
import { useEffect, useState } from "react";
import { useCreateAdminUserMutation } from "@/app/api/apiSlice";

import CustomButton from "@/app/components/common/custom-button";
import { adminRoles, deliveryManStatusCategory } from "@/app/data";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Modal } from "antd";
import CustomInput from "@/app/components/common/custom-input";
import CustomSelect from "@/app/components/common/custom-select";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const initialValues = {
  role: adminRoles[0].value,
  name: "",
  email_address: "",
  phone_number: "",
  password: "",
};

const adminUserValidationSchema = Yup.object().shape({
  role: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  email_address: Yup.string().required("Required"),
  phone_number: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  password: Yup.string().required("Required"),
});

function CreateAdminForm({
  refetch,
  modalVisible,
  setModalVisible,
  setPageIndex,
  showModal,
  handleCancel,
}) {
  const [
    createAdminUser,
    { isLoading: isCreateAdminUserLoading, isError: isCreatingAdminUserError },
  ] = useCreateAdminUserMutation();

  const refetchData = () => {
    refetch();
  };

  const submitAdminUser = async (values) => {
    try {
      const response = await createAdminUser(values);
      if (response?.data?.status) {
        setModalVisible(false);
        refetchData();
        setPageIndex(1);
        toast(
          <span className="text-green-500">
            Admin User created sucessfully
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
      {" "}
      <Modal
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={650}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={adminUserValidationSchema}
          onSubmit={submitAdminUser}
        >
          {({ isValid }) => (
            <Form>
              <div className="flex  flex-wrap items-center justify-between gap-3 w-full">
                <div className="w-[45%]">
                  <CustomSelect
                    label="Status"
                    name="role"
                    options={adminRoles}
                  />
                </div>
                <div className="w-[45%]">
                  <CustomInput
                    label="Name"
                    placeholder="Name"
                    type="text"
                    name="name"
                  />
                </div>
                <div className="w-[45%]">
                  <CustomInput
                    label="Email"
                    placeholder="Email"
                    type="text"
                    name="email_address"
                  />
                </div>
                <div className="w-[45%]">
                  <CustomInput
                    label="Phone"
                    placeholder="Phone"
                    type="text"
                    name="phone_number"
                  />
                </div>

                <div className="w-[45%]">
                  <CustomInput
                    label="Password"
                    placeholder="Password"
                    type="password"
                    name="password"
                  />
                </div>
              </div>

              <div className="max-w-[200px] my-8 mx-auto">
                <CustomButton
                  primary
                  clicked={showModal}
                  type="submit"
                  isLoading={isCreateAdminUserLoading}
                  disabled={!isValid || isCreateAdminUserLoading}
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

export default CreateAdminForm;
