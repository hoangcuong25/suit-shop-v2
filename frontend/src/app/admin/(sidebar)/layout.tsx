import NavbarAdmin from "@/components/NavbarAdmin";
import SidebarAdmin from "@/components/SidebarAdmin";
import AdminContextProvider from "@/context/AdminContext";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SUIT SHOP | ADMIN",
    description: "SUIT SHOP",
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AdminContextProvider>
            <div>
                <NavbarAdmin />
                <div className='flex items-start '>
                    <SidebarAdmin />
                    {children}
                </div>
            </div>
        </AdminContextProvider>
    );
}
