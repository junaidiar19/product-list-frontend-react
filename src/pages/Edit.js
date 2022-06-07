import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "./layouts/Layout";

export default function Edit() {
  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id);
  const [errors, setErrors] = useState(null);
  const [state, setState] = useState([
    {
      name: "",
      qty: "",
      category_id: "",
    },
  ]);

  const handleChange = e => {
    const { name, value } = e.target;

    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    await axios.get(process.env.REACT_APP_API_URL + "/category").then(res => {
      setCategory(res.data.data);
    });
  };

  const showProduct = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/products/" + id)
      .then(res => {
        setState(res.data.data);
        console.log(res.data.data);
      });
  };

  useEffect(() => {
    getCategory();
    showProduct();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .put(process.env.REACT_APP_API_URL + `/products/${id}`, state)
      .then(res => {
        setErrors(null);

        // navigate to product
        navigate("/product");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <>
      <Layout>
        <div className="mb-3">
          <Link to={"/product"}>Kembali</Link>
        </div>

        <div className="row">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name of Product</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name of Product"
                  onChange={handleChange}
                  value={state.name}
                />
                {errors && errors.name && (
                  <span className="text-danger"> {errors.name[0]} </span>
                )}
              </div>

              <div className="form-group">
                <label>Qty</label>
                <input
                  type="number"
                  name="qty"
                  className="form-control"
                  placeholder="Qty"
                  onChange={handleChange}
                  value={state.qty}
                />
                {errors && errors.qty && (
                  <span className="text-danger"> {errors.qty[0]} </span>
                )}
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-control"
                  name="category_id"
                  onChange={handleChange}
                  value={state.category_id}
                >
                  <option value="">-Choose Category-</option>
                  {category.length > 0 &&
                    category.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
                {errors && errors.category_id && (
                  <span className="text-danger"> {errors.category_id[0]} </span>
                )}
              </div>

              <div className="d-grid">
                <button className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
