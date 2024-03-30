"use client";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { selectUser } from "@store/slice/userSlice";
import Login from "@components/page-sections/login";
import { useSelector } from "react-redux";

function Home() {
  const router = useRouter();
  const user = useSelector((selectUser) => selectUser.state);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");

      if (user || token) {
        router.push("admin/dashboard");
      }
    }
  }, [user]);
  return (
    <main>
      <Login />
    </main>
  );
}

export default Home;
