import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        "https://my-json-server.typicode.com/codegym-vn/mock-api-books/books"
      )
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios
        .delete(
          `https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${bookId}`
        )
        .then(() => {
          alert("Delete success");
          setBooks(books.filter((book) => book.id !== bookId));
        })
        .catch(() => {
          alert("Delete fail");
        });
    }
  };

  return (
    <div>
      <h1>Library</h1>
      <button
        onClick={() => {
          navigate("/books/add");
        }}
      >
        Add new book
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.quantity}</td>
                <td>
                  <button onClick={() => navigate(`/books/edit/${book.id}`)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Books;
