import { useRouter, useParams } from "next/navigation";
import Header from "@components/page-sections/header";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  useGetCustomerOrderDetailsQuery,
  useGetDeliveryManOrdersQuery,
  useGetDeliveryManQuery,
  useGetOrderDetailsQuery,
} from "@/app/api/apiSlice";
import { useEffect, useState } from "react";

import DeliveryManOrderDetailsTable from "@/app/components/page-sections/delivery-man/DeliveryManOrderTable";
import { FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import { MdDeleteOutline } from "react-icons/md";
import DeliveryManForm from "../DeliveryManForm";
import DeleteDeliveryMan from "../DeleteDeliveryMan";
import { useAppQueryState } from "@/app/hooks/useAppQueryState";

function DeliveryManOrderDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [pageIndex, setPageIndex] = useState(1);
  const [editDetails, setEditDetails] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { deliveryMenyPageIndex } = useAppQueryState();

  const { data, isLoading, isError } = useGetDeliveryManOrdersQuery(id);
  const {
    data: deliveryManDetails,
    isError: deliveryManDetailsError,
    refetch,
  } = useGetDeliveryManQuery(id);

  const handleRowClick = () => {
    router.push(`/admin/orders`);
  };

  useEffect(() => {
    if (!id || deliveryManDetailsError) {
      router.push(`/admin/delivery-man`);
    }
  }, [id, deliveryManDetailsError]);

  const { avatar, role, name, emailAddress, phoneNumber, rating, status } =
    deliveryManDetails?.data || {};

  function showEditModal() {
    setEditModalVisible(true);
  }

  function showDeleteModal() {
    setDeleteModalVisible(true);
  }

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };
  const onPageChange = (label) => {
    setPageIndex(label);
  };

  const editDetailsHandler = () => {
    setEditDetails({
      deliveryman_id: id,
      deliveryman_name: name,
      deliveryman_phone_number: phoneNumber,
      deliveryman_email_address: emailAddress,
      deliveryman_status: status,
    });
    showEditModal();
  };

  const navigationHandler = () => {
    router.push(`/admin/delivery-man?deliveryMenPage=${deliveryMenyPageIndex}`);
  };

  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 ">
      <Header title="Delivery Man" />
      {deliveryManDetails?.data && (
        <div className="w-[60%] bg-white">
          <div className="mt-1  mx-2 text-gray-600  p-1 w-fit cursor-pointer border rounded-md hover:border-gray-800 ">
            <p onClick={navigationHandler}>
              <IoIosArrowRoundBack size="1.2rem" />
            </p>
          </div>
          <div className=" flex   rounded-md   p-3 gap-4">
            <div className="w-24 h-24">
              <img
                src={avatar}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex gap-4">
                <p>
                  <span className="text-gray-500">Name:</span> {name}
                </p>
                <p>
                  <span className="text-gray-500">Role:</span> {role}
                </p>
              </div>
              <div className="flex gap-4">
                <p>
                  <span className="text-gray-500">Email:</span> {emailAddress}
                </p>
                <p>
                  <span className="text-gray-500">Phone:</span> {phoneNumber}
                </p>
              </div>
              <div className="flex gap-4">
                <p className="flex gap-4">
                  <span className="text-gray-500">Rating:</span>
                  <span className="flex items-center m-auto w-fit text-xs  gap-1">
                    {Array.from({ length: rating }, (_, i) => (
                      <FaStar key={i} color="#ffd700" />
                    ))}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Status:</span>{" "}
                  <span
                    className={`font-bold ${
                      status === "active" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {status}
                  </span>
                </p>
              </div>
              <div className="my-1 flex gap-1 items-center">
                <button
                  className="hover:border-2 border-gray-500 rounded-md p-1 text-gray-500"
                  onClick={() => editDetailsHandler()}
                >
                  <FiEdit size="1.2rem" />
                </button>
                <button
                  className="hover:border-2 border-red-500 rounded-md p-1 text-red-500"
                  onClick={() => showDeleteModal()}
                >
                  <MdDeleteOutline size="1.2rem" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <DeliveryManOrderDetailsTable
          data={data}
          isLoading={isLoading}
          onPageChange={onPageChange}
        />
      </div>
      <DeliveryManForm
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
        refetch={refetch}
        showModal={showEditModal}
        handleCancel={handleEditCancel}
        setPageIndex={setPageIndex}
        editDetails={editDetails}
      />
      <DeleteDeliveryMan
        modalVisible={deleteModalVisible}
        handleCancel={handleDeleteCancel}
        deliveryManDetails={deliveryManDetails?.data}
      />
    </section>
  );
}

export default DeliveryManOrderDetails;
