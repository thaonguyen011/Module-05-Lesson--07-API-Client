import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  axios
    .get("https://my-json-server.typicode.com/codegym-vn/mock-api-users/users")
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      throw err;
    });

  const handleDelete = async (userId) => {
    try {
      const deleteUser = axios.delete(
        `https://my-json-server.typicode.com/codegym-vn/mock-api-users/users/${userId}`
      );
      const getArticle = await axios.get(
        "https://my-json-server.typicode.com/codegym-vn/mock-api-articles/articles"
      );
      const deleteArticles = [];
      getArticle.then((res) => {
        for (let article of res.data) {
          if (article.user_id === userId) {
            deleteArticles.push(
              axios.delete(
                `https://my-json-server.typicode.com/codegym-vn/mock-api-articles/articles/${article.id}`
              )
            );
          }
        }
      });

      await axios.all([deleteUser, ...deleteArticles]);
      setUsers(users.filter((item) => item.id !== userId));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Users</h1>
      <button onClick={() => navigate("/users/add")}>Add User</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>
                <button onClick={() => navigate(`/users/edit/${user.id}`)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
