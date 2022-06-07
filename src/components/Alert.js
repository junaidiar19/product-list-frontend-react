import React from "react";

export default function Alert({ type, message, ...props }) {
  return (
    <>
      {type === "success" && (
        <div className="alert alert-success">{message}</div>
      )}
    </>
  );
}
