"use client";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const router = useRouter();
  const user = useSelector((selectUser) => selectUser.state);
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        router.push("/");
      }
    }
  }, [user]);

  return children;
}

export default ProtectedRoute;
