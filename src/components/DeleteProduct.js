import axios from "axios";
import React from "react";

export default function DeleteProduct({ idProduct, setSuccess }) {
  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/products/${idProduct}`)
      .then(res => {
        setSuccess(res.data);

        setTimeout(() => {
          setSuccess({
            message: "",
          });
        }, 3000);
      });
  };

  return (
    <button className="btn btn-sm btn-danger mr-1" onClick={handleDelete}>
      Hapus
    </button>
  );
}
