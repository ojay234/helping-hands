"use client";
import { useEffect, useState } from "react";
import {
  useCreateAdminUserMutation,
  useDeleteAdminUserMutation,
  useUpdateAdminUserMutation,
} from "@/app/api/apiSlice";

import CustomButton from "@/app/components/common/custom-button";
import { adminRoles, deliveryManStatusCategory } from "@/app/data";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Modal } from "antd";
import CustomInput from "@/app/components/common/custom-input";
import CustomSelect from "@/app/components/common/custom-select";
import styled from "styled-components";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const initialValues = {
  role: adminRoles[0].value,
  name: "",
  email_address: "",
  phone_number: "",
  password: "",
};

function CreateAdminForm({
  refetch,
  modalVisible,
  setModalVisible,
  onPageChange,
  showModal,
  handleCancel,
  editDetails = null,
}) {
  const adminUserValidationSchema = Yup.object().shape({
    role: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    email_address: Yup.string().required("Required"),
    phone_number: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    password: !editDetails && Yup.string().required("Required"),
  });
  const { adminId, initialValues: initialEditValues } = editDetails || {};

  const [
    createAdminUser,
    { isLoading: isCreateAdminUserLoading, isError: isCreatingAdminUserError },
  ] = useCreateAdminUserMutation();

  const [
    updateAdminUser,
    { isLoading: isUpdateAdminUserLoading, isError: isUpdateAdminUserError },
  ] = useUpdateAdminUserMutation();

  const [
    deleteAdminUser,
    { isLoading: isDeleteAdminUserLoading, isError: isDeleteAdminUserError },
  ] = useDeleteAdminUserMutation();

  const refetchData = () => {
    refetch();
  };

  const submitAdminUser = async (values) => {
    if (editDetails) {
      try {
        const response = await updateAdminUser({ id: adminId, body: values });
        if (response?.data?.status) {
          setModalVisible(false);
          refetchData();
          onPageChange(1);
          toast(
            <span className="text-green-500">
              Admin User updated sucessfully
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
    } else {
      try {
        const response = await createAdminUser(values);
        if (response?.data?.status) {
          setModalVisible(false);
          refetchData();
          onPageChange(1);
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
    }
  };

  const deleteAdminHandler = async () => {
    try {
      const response = await deleteAdminUser(adminId);
      if (response?.data?.status) {
        setModalVisible(false);
        refetchData();
        onPageChange(1);
        toast(
          <span className="text-green-500">
            Admin User deleted sucessfully
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
          key={adminId}
          initialValues={initialEditValues || initialValues}
          validationSchema={adminUserValidationSchema}
          onSubmit={submitAdminUser}
        >
          {({ isValid, dirty }) => (
            <Form>
              <div className="flex  flex-wrap items-center justify-between gap-3 w-full">
                <div className="w-[45%]">
                  <CustomSelect
                    label="Role"
                    name="role"
                    options={adminRoles}
                    disabled={editDetails}
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
                {!editDetails && (
                  <div className="w-[45%]">
                    <CustomInput
                      label="Password"
                      placeholder="Password"
                      type="password"
                      name="password"
                    />
                  </div>
                )}
              </div>
              <div className="flex my-8 mx-auto justify-center gap-7">
                <div className="max-w-[150px] ">
                  <CustomButton
                    primary
                    type="submit"
                    isLoading={isCreateAdminUserLoading}
                    disabled={
                      !isValid ||
                      !dirty ||
                      isCreateAdminUserLoading ||
                      isUpdateAdminUserLoading
                    }
                  >
                    Submit
                  </CustomButton>
                </div>
                {editDetails && (
                  <DeleteButtonContainer className="max-w-[150px]">
                    <CustomButton
                      primary
                      clicked={deleteAdminHandler}
                      type="button"
                      isLoading={isDeleteAdminUserLoading}
                      disabled={
                        isCreateAdminUserLoading || isDeleteAdminUserLoading
                      }
                    >
                      Delete
                    </CustomButton>
                  </DeleteButtonContainer>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}

const DeleteButtonContainer = styled.div`
  button {
    background-color: red !important;
  }
`;

export default CreateAdminForm;
