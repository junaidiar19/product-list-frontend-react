import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import DeleteProduct from "../components/DeleteProduct";
import InputProduct from "../components/InputProduct";
import Layout from "./layouts/Layout";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [success, setSuccess] = useState({
    message: "",
  });

  const getProduct = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/products")
      .then(res => {
        setProduct(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProduct();
  }, [success]);

  console.log(success);

  return (
    <>
      <Layout>
        <h6>Input Product:</h6>
        <InputProduct setSuccess={setSuccess} />
        {success.message ? (
          <Alert type="success" message={success.message} />
        ) : (
          ""
        )}

        <h6>Data Product:</h6>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th width="10">No</th>
                <th>Name</th>
                <th>Qty</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                product.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>{item.category.name}</td>
                    <td>
                      <DeleteProduct
                        idProduct={item.id}
                        setSuccess={setSuccess}
                      />
                      <Link
                        to={`/product/${item.id}/edit`}
                        className="btn btn-success btn-sm"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} align="center">
                    Sedang memuat...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
}
