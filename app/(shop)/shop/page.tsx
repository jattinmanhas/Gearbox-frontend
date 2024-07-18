import WithNavbar from "@/components/WithNavbar";
import React from "react";
import { getShopDetails } from "@/api/auth";

// async function setCookieInBackend() {
// }

export default async function ShopPage() {
  const response = await fetch("http://localhost:5000/shop", {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    console.log("Cookie set successfully");
  } else {
    console.log("Failed to set cookie");
  }

  return (
    <div>
      <WithNavbar />
      Shop Page!!
    </div>
  );
}
