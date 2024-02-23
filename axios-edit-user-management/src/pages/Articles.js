import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Articles() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);
  const router = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/articles")
      .then((res) => {
        const data = res.data;
        const data2 = data.filter(
          (article) => article.user_id === parseInt(userId)
        );
        setArticles(data2);
        // console.log(data2);
      })
      .catch((err) => {
        throw err;
      });
    axios
      .get(`http://localhost:3001/api/users/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [userId]);

  const handleDelete = async (index) => {
    articles.splice(index, 1);
    setArticles(articles);
    axios
      .post("http://localhost:3001/api/articles", articles)
      .then(() => {
        alert("Delete success");
      })
      .catch((err) => {
        alert("Delete fail");
      });
  };

  return (
    <div>
      <h1>Articles</h1>
      <p>User name: {user.name}</p>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={index}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td>
                <button onClick={() => router(`/article/${userId}/add`)}>
                  Add
                </button>
                <button onClick={() => router(`/article/edit/${article.id}`)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Articles;
