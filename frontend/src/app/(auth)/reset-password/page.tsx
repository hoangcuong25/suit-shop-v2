import ResetPasswordForm from "@/components/ResetPasswordForm"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password | SUIT SHOP",
    description: "Reset your password to regain access to your SUIT SHOP account.",
};

const ResetPassword = () => {
    return (
        <ResetPasswordForm />
    )
}

export default ResetPassword