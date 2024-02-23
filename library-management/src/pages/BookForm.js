import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BookForm() {
  const [form, setForm] = useState({});
  const { bookId } = useParams();
  const [isCreated, setCreate] = useState(false);
  const [isValid, setValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (bookId !== undefined) {
      axios
        .get(
          `https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${bookId}`
        )
        .then((res) => {
          setForm(res.data);
          setCreate(true);
          setValid(true);
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            setValid(false);
          }
        });
    } else if (bookId === undefined) {
      setValid(true);
    }
  }, [bookId]);

  const handleChange = (event) => {
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      isCreated
        ? await axios.put(
            `https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${bookId}`,
            form
          )
        : await axios.post(
            `https://my-json-server.typicode.com/codegym-vn/mock-api-books/books`,
            form
          );
      alert("success");
      navigate("/books");
    } catch (err) {
      alert("fail");
    }
  };

  return (
    <div>
      {!isValid ? (
        <h1>Book not found</h1>
      ) : (
        <>
          <h1>{isCreated ? "Edit book" : "Create new book"}</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={form.title || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity || ""}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
}

export default BookForm;
