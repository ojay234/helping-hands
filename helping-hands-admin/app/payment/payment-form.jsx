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

  useEffect(() => {
    const getOrderkey = async () => {
      console.log("running");
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

        if (!res.ok) {
          throw new Error("Failed to fetch payment information");
        }

        const data = await res.json();
        setSecretKey(data.secret);
        setIntent(data.intent);
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
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      secretKey,
      confirmParams: {
        return_url: `${window.location.origin}`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      verifyPayment();
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full mt-20 flex flex-col justify-center items-center"
    >
      <PaymentElement />
      <div className="my-5 min-w-[150px]">
        <CustomButton primary type="submit" disabled={!stripe || !elements}>
          Pay
        </CustomButton>
      </div>

      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}

const stripePromise = loadStripe(
  "pk_test_51OlLDSKkzJBhYCR2c52sBERnhKGR1MdQtOEaG0jOiez0YkDM3tJgw66hyrSE8odYnc0BnkOSAVYSudPWmn70DqlJ003kdLUWdE"
);

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
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
