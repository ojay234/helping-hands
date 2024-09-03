import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@components/page-sections/header";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  useGetAssignableDeliveryManQuery,
  useGetCustomerOrderDetailsQuery,
  useGetOrderDetailsQuery,
} from "@/app/api/apiSlice";

import OrderDetailsTable from "@/app/components/page-sections/orders/order-details-table";
import CustomButton from "@/app/components/common/custom-button";
import { Modal } from "antd";
import AssignableDeliveryMenTable from "@/app/components/page-sections/delivery-man/AssignableDeliveryMenTable";

function OrderDetails() {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) {
      router.push(`/admin/orders`);
    }
  }, [orderId]);

  const {
    data,
    isLoading,
    refetch: refetchOrderDetails,
  } = useGetOrderDetailsQuery(orderId);
  const {
    data: assignableDeliveryMen,
    isLoading: assignableDeliveryMenLoading,
    refetch: refetchAssignableDeliveryMan,
  } = useGetAssignableDeliveryManQuery();

  const { orderCustomer, orderAssignStatus } = data?.data || {};

  const handleRowClick = () => {
    router.push(`/admin/orders`);
  };

  const onPageChange = (label) => {
    setPageIndex(label);
  };

  function showModal() {
    setModalVisible(true);
  }

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 ">
      <Header title="Orders" />
      <div className="bg-white py-5 rounded-lg">
        {data && (
          <div className="flex items-center justify-between my-3 px-3">
            <p className="text-gray_600 flex gap-3 items-center">
              <span onClick={handleRowClick}>
                <IoIosArrowRoundBack size="1.2rem" />
              </span>
              <span>{orderCustomer}</span>
            </p>
            <CustomButton
              width="20%"
              clicked={showModal}
              disabled={orderAssignStatus}
            >
              {orderAssignStatus ? "Order Assigned" : "Assign Order"}
            </CustomButton>
          </div>
        )}

        <OrderDetailsTable data={data} isLoading={isLoading} />

        <Modal
          open={modalVisible}
          onCancel={handleCancel}
          footer={null}
          width={650}
        >
          <AssignableDeliveryMenTable
            orderId={orderId}
            data={assignableDeliveryMen}
            refetchAssignableDeliveryMan={refetchAssignableDeliveryMan}
            refetchOrderDetails={refetchOrderDetails}
            onPageChange={onPageChange}
            isLoading={assignableDeliveryMenLoading}
            handleCancel={handleCancel}
          />
        </Modal>
      </div>
    </section>
  );
}

export default OrderDetails;
