import React from "react";
import { Outlet } from "react-router-dom";

export default function Navbar(){
    return (
        <>
        <div className="nav d-flex align-items-center justify-content-between px-5 py-2">
            <h2 className="my-0 text-white">QuizWizard</h2>
            <p className="my-0 text-white">Where knowledge meets fun!</p>
        </div>
        <Outlet />
        </>
    )
}