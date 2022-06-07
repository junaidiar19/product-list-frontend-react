import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "../pages/Category";
import Edit from "../pages/Edit";
import Home from "../pages/Home";
import Product from "../pages/Product";

export default function index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="category" element={<Category />} />
        {/* <Route path="product/:id/edit" element={<Edit />} /> */}
        <Route path="product/:id/edit" element={<Edit />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
