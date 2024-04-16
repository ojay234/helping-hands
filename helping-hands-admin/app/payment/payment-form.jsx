"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import CustomButton from "../components/common/custom-button";

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const userToken = searchParams.get("userToken");
  const [secretKey, setSecretKey] = useState("");
  const [intent, setIntent] = useState("");
  const [orderError, setOrderError] = useState("");
  const [paymentElementLoaded, setPaymentElementLoaded] = useState(false);

  useEffect(() => {
    const getOrderkey = async () => {
      try {
        // Create the PaymentIntent and obtain clientSecret from your server endpoint
        const res = await fetch(
          "https://hh.altoservices.net/api/v1/customer/orders/pay",
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${userToken}`, // Set bearer token
              "Content-Type": "application/json", // Assuming the content type is JSON
            },
            body: JSON.stringify({ order_id: orderId }), // Sending orderId in the request body
          }
        );

        const data = await res.json();
        console.log(data);
        if (data?.data?.intent) {
          setSecretKey(data?.data?.secrete);
          setIntent(data?.data?.intent);
        } else {
          setOrderError(data?.message);
        }
      } catch (err) {}
    };
    getOrderkey();
  }, [orderId, userToken]);

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const verifyPayment = async () => {
    try {
      // Create the PaymentIntent and obtain clientSecret from your server endpoint
      const res = await fetch(
        `https://hh.altoservices.net/api/payment-gateway/stripe/${intent}/verify`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`, // Set bearer token
            "Content-Type": "application/json", // Assuming the content type is JSON
          },
        }
      );
    } catch (err) {}
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    } else {
      verifyPayment();
      router.push(`/payment/details?orderId=${orderId}userToken=${userToken}`);
    }
  };

  if (orderError) {
    return (
      <div className="text-center w-fit mx-auto mt-20 text-red-500">
        {orderError}
      </div>
    );
  }

  if (!orderId || !userToken) {
    return (
      <div className="h-screen  flex flex-col items-center justify-center">
        <h2 className="text-center text-2xl font-bold">
          No orderId was provided
        </h2>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full mt-20 flex flex-col justify-center items-center"
    >
      <PaymentElement onReady={() => setPaymentElementLoaded(true)} />
      {paymentElementLoaded && (
        <div className="my-5 min-w-[150px]">
          <CustomButton primary type="submit" disabled={!stripe || !elements}>
            Pay
          </CustomButton>
        </div>
      )}

      {/* Show error message to your customers */}
      {errorMessage && (
        <div className="text-sm text-red-500">{errorMessage}</div>
      )}
    </form>
  );
}

const stripePromise = loadStripe(
  "pk_test_51OlLDSKkzJBhYCR2c52sBERnhKGR1MdQtOEaG0jOiez0YkDM3tJgw66hyrSE8odYnc0BnkOSAVYSudPWmn70DqlJ003kdLUWdE"
);

const options = {
  mode: "payment",
  currency: "usd",
  amount: 10,
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

function PaymentForm() {
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}

export default PaymentForm;
