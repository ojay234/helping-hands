"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styled from "styled-components";
import logo from "@assets/icon/logo.svg";
import dashboardIcon from "@assets/icon/dashboard.svg";
import dashboardActiveIcon from "@assets/icon/dashboard-active.svg";
import ordersIcon from "@assets/icon/orders.svg";
import ordersActiveIcon from "@assets/icon/orders-active.svg";
import adminIcon from "@assets/icon/admin.svg";
import adminActiveIcon from "@assets/icon/admin-active.svg";
import customersIcon from "@assets/icon/customers.svg";
import customersActiveIcon from "@assets/icon/customers-active.svg";
import walletIcon from "@assets/icon/wallet.svg";
import walletActiveIcon from "@assets/icon/wallet-active.svg";
import supportIcon from "@assets/icon/support.svg";
import supportActiveIcon from "@assets/icon/support-active.svg";
import Link from "next/link";

const menuItems = [
  {
    title: "Dashboard",
    icon: dashboardIcon,
    activeIcon: dashboardActiveIcon,
    path: "/admin/dashboard",
  },
  {
    title: "Orders",
    icon: ordersIcon,
    activeIcon: ordersActiveIcon,
    path: "/admin/orders",
  },
  {
    title: "Customers",
    icon: customersIcon,
    activeIcon: customersActiveIcon,
    path: "/admin/customers",
  },
  {
    title: "Admin Management",
    icon: adminIcon,
    activeIcon: adminActiveIcon,
    path: "/admin/management",
  },
  {
    title: "Payment History",
    icon: walletIcon,
    activeIcon: walletActiveIcon,
    path: "/admin/wallet",
  },
  {
    title: "Support",
    icon: supportIcon,
    activeIcon: supportActiveIcon,
    path: "/admin/support",
  },
];

function Sidebar() {
  const currentRoute = usePathname();
  console.log(currentRoute);
  return (
    <SidebarContainer className="bg-blue_400 h-screen flex flex-col">
      <div className="mx-auto w-fit">
        <Image src={logo} alt="logo" width={80} height={50} />
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`${
              currentRoute === item.path ? "bg-blue_800" : "bg-transparent "
            } text-white rounded-lg my-2`}
          >
            <Link
              href={item.path}
              className="flex gap-2 py-2 px-3 items-center"
            >
              {currentRoute === item.path ? (
                <Image
                  src={item.activeIcon}
                  width={24}
                  height={24}
                  alt={item.title}
                />
              ) : (
                <Image
                  src={item.icon}
                  width={24}
                  height={24}
                  alt={item.title}
                />
              )}

              <p>{item.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  position: fixed;
  width: 18vw;
  padding: 20px 10px;
  margin: 0;
  gap: 60px;
`;

export default Sidebar;
