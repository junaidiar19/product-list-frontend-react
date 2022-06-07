import React from "react";
import Layout from "./layouts/Layout";

export default function Home() {
  return (
    <>
      <Layout>
        <div className="alert alert-success">
          <strong>Hai!</strong>
          <p className="mb-0">Welcome to homepage</p>
        </div>
      </Layout>
    </>
  );
}
