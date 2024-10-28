import { parseAsInteger, useQueryState } from "nuqs";

export function useAppQueryState() {
  const [orderPageIndex, setOrderPageIndex] = useQueryState(
    "orderPage",
    parseAsInteger.withDefault(1)
  );
  const [customerPageIndex, setCustomerPageIndex] = useQueryState(
    "customerPage",
    parseAsInteger.withDefault(1)
  );
  const [deliveryMenyPageIndex, setDeliveryMenPageIndex] = useQueryState(
    "deliveryMenPage",
    parseAsInteger.withDefault(1)
  );
  return {
    orderPageIndex,
    setOrderPageIndex,
    customerPageIndex,
    setCustomerPageIndex,
    deliveryMenyPageIndex,
    setDeliveryMenPageIndex,
  };
}
