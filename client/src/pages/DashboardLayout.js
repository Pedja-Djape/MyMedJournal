import { Outlet } from "react-router-dom";

import React from 'react'
import DashboardNavigation from "../components/DashboardNavigation";

const DashboardLayout = () => {
    return (
    <>
        <DashboardNavigation />
        <Outlet />
    </>
    )
}

export default DashboardLayout;