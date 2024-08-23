import Link from "next/link";
import Menu from "../../components/Menu"
import Navbar from "@/components/Navbar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
     {/* LEFT */}
     <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] ">
      <Link href='/' className="flex items-center justify-center gap-2">
        <img src="/logo.png" alt="logo" width={26} height={26} />
        <span className="hidden lg:block font-bold text-sm">School Management</span>
      </Link>
      <Menu/>
     </div>
     {/* RIGHT */}
     <div className="w-[86%] md:w-[92%] lg:w-[86%] xl:w-[86%] bg-gray-50 overflow-scroll ">
      <Navbar/>
      {children}
     </div>

    </div>
  );
}
