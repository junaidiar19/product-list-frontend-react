import React from "react";
import Navbar from "../includes/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container py-4">{children}</div>
    </>
  );
}
