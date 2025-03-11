import React from 'react'
import WrapMyProfile from './WrapMyProfile'

export const metadata = {
    title: "My Profile | SUIT SHOP",
    description: "View and edit your profile details.",
};

const page = () => {
    return (
        <div>
            <WrapMyProfile />
        </div>
    )
}

export default page