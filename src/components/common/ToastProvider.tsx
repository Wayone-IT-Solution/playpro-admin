"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => (
    <ToastContainer
        rtl={false}
        autoClose={2000}
        newestOnTop={true}
        position="top-right"
        hideProgressBar={false}
    />
);
export default ToastProvider;
