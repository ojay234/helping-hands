import ProtectedRoute from "@components/layout/protected-route";
import Sidebar from "@components/layout/sidebar";
export default function RootLayout({ children }) {
  return (
    <ProtectedRoute>
      <section className="flex relative text-black_400">
        <Sidebar />
        <div className="ml-[18vw] bg-gray_200 w-full h-full">{children}</div>
      </section>
    </ProtectedRoute>
  );
}
