"use client";

import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import formatPrice from "@/utils/PriceFormat";
import { useCartStore } from "@/store";

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  const formattedPrise = formatPrice(totalPrice);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Button clicked");

    if (!stripe || !elements) {
      console.log("Stripe has not loaded or elements are missing");
      return;
    }
    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      console.log(error.message);
    } else if (paymentIntent) {
      if (paymentIntent.status === "succeeded") {
        cartStore.setCheckout("success");
      }
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" options={{ layout: "auto" }} />
      <h1>Total: {formattedPrise}</h1>
      <button id="submit" disabled={isLoading || !stripe || !elements}>
        <span id="button-text">
          {isLoading ? <span>Processing</span> : <span>Betal nå</span>}
        </span>
      </button>
    </form>
  )
  
}