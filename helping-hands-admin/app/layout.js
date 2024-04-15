import { Jost } from "next/font/google";
import { Providers } from "./store/provider";
import DesktopOnlyComponent from "./components/layout/DesktopOnlyComponent";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const jost = Jost({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <Providers>
          <DesktopOnlyComponent>{children}</DesktopOnlyComponent>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
