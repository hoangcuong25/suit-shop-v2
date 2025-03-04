"use client";

import { AppContext } from "@/context/AppContext";
import { useSearchParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function PaymentStatusPage() {
    const { setCodePayment } = useContext(AppContext);
    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get("code") || "";
    const isSuccess = code === "00";

    setCodePayment(code);

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/my-profile");
        }, 5000);

        return () => clearTimeout(timer); 
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {isSuccess ? (
                <>
                    <h1 className="text-3xl font-bold text-green-600">Thanh toán thành công!</h1>
                    <p className="text-gray-600 mt-2">Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn sớm.</p>
                </>
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-red-600">Thanh toán thất bại!</h1>
                    <p className="text-gray-600 mt-2">Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.</p>
                </>
            )}
            <p className="mt-4 text-gray-500">Bạn sẽ được chuyển hướng về trang chủ sau 5 giây...</p>
        </div>
    );
}
