import axios from "axios";
import React, { useEffect, useState } from "react";

export default function InputProduct({ setSuccess }) {
  const [errors, setErrors] = useState(null);
  const [state, setState] = useState([
    {
      name: "",
      qty: "",
      category_id: "",
    },
  ]);

  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    await axios.get(process.env.REACT_APP_API_URL + "/category").then(res => {
      setCategory(res.data.data);
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;

    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_API_URL + "/products", state)
      .then(res => {
        setSuccess(res.data);
        setErrors(null);

        setState({
          name: "",
          qty: "",
          category_id: "",
        });

        setTimeout(() => {
          setSuccess({
            message: "",
          });
        }, 3000);
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row mb-4">
          <div className="col-md-3">
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
          <div className="col-md-3">
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
          <div className="col-md-3">
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
          <div className="col-md-3">
            <button className="btn btn-primary px-4">Save</button>
          </div>
        </div>
      </form>
    </>
  );
}
