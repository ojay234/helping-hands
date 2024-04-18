import MiniLoader from "@/app/components/common/mini-loader";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const formatToken = (token) => {
  return token?.replace(/%/g, "|");
};

function PaymentDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const userToken = formatToken(searchParams.get("userToken"));
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (!orderId) {
      router.push("/");
    }
  }, [orderId]);

  useEffect(() => {
    const getPaymentDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://hh.altoservices.net/api/v1/customer/orders/${orderId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setImgSrc(data?.data?.orderBarcode);
        setLoading(false);
        if (data?.status === false) {
          setErrorMsg(data?.message);
        }
      } catch (err) {
        /* empty */
      }
    };
    getPaymentDetails();
  }, [orderId, userToken]);

  const handleDownload = async () => {
    try {
      if (imgSrc) {
        const response = await fetch(imgSrc);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "barcode.png");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      }
    } catch (err) {
      console.error("Error downloading image:", err);
    }
  };

  return (
    <section className="flex flex-col  mx-auto gap-4 h-screen justify-center bg-black">
      {loading ? (
        <div className="mx-fit m-auto">
          <MiniLoader />
        </div>
      ) : errorMsg ? (
        <p className="text-red-500 w-fit m-auto">{errorMsg}</p>
      ) : (
        <>
          <div className="w-[200px] mx-auto">
            <img src={imgSrc} alt="" className="w-full h-full" />
          </div>

          <button
            className="bg-white w-fit mx-auto my-4 py-2 px-3 rounded-lg"
            onClick={handleDownload}
          >
            Download
          </button>
        </>
      )}
    </section>
  );
}

export default PaymentDetails;
