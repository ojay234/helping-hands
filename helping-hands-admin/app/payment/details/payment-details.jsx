import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const formatToken = (token) => {
  return token?.replace(/%/g, "|");
};

function PaymentDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const userToken = formatToken(searchParams.get("userToken"));
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (!orderId) {
      router.push("/");
    }
  }, [orderId]);



  useEffect(() => {
    const getPaymentDetails = async () => {
      try {
        // Create the PaymentIntent and obtain clientSecret from your server endpoint
        const res = await fetch(
          `https://hh.altoservices.net/api/v1/customer/orders/${orderId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userToken}`, // Set bearer token
              "Content-Type": "application/json", // Assuming the content type is JSON
            },
          }
        );
        const data = await res.json();
        setImgSrc(data?.data?.orderBarcode);
      } catch (err) {
        console.log(err);
      }
    };
    getPaymentDetails();
  }, [orderId, userToken]);

const handleDownload = async () => {
  try {
    const link = document.createElement("a");
    link.href = imgSrc;
    link.setAttribute("download", "payment_details.png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
};


  return (
    <section className="flex flex-col  mx-auto gap-4 h-screen justify-center bg-black">
      <div className="w-[200px] mx-auto">
        <img src={imgSrc} alt="" className="w-full h-full" />
      </div>
      <button
        className="bg-white w-fit mx-auto my-4 py-2 px-3 rounded-lg"
        onClick={handleDownload}
      >
        Download
      </button>
    </section>
  );
}

export default PaymentDetails;
