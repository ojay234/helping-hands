import Header from "../components/layout/header";
import Sidebar from "../components/layout/sidebar";

export default function RootLayout({ children }) {
  return (
    <section className="flex relative">
      <Sidebar />
      <div className="ml-[18vw]">
        <Header />
      </div>
    </section>
  );
}
