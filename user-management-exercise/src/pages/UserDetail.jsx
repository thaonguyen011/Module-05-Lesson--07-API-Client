import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [state, setState] = useState(0);
  const [article, setArticle] = useState({});
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState(0);
  const [isArticle, setArticleState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      const getUser = axios.get(
        `https://my-json-server.typicode.com/codegym-vn/mock-api-users/users/${userId}`
      );
      const getArticles = axios.get(
        `https://my-json-server.typicode.com/codegym-vn/mock-api-articles/articles`
      );

      axios
        .all([getUser, getArticles])
        .then(
          axios.spread((res1, res2) => {
            setUser(res1.data);
            setState(200);
            setArticle((prev) => ({ ...prev, user_id: parseInt(userId) }));
            setArticles(
              res2.data.filter((item) => item.user_id === parseInt(userId))
            );

            setCount(res2.data.length);
          })
        )
        .catch((err) => {
          if (err.response.status === 404) {
            setState(404);
          }
        });
    }
  }, [userId]);

  const handleChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (state === 0) {
  //     axios
  //       .post(
  //         "https://my-json-server.typicode.com/codegym-vn/mock-api-users/users",
  //         user
  //       )
  //       .then((res) => {
  //         alert(`Add user success`);
  //       });
  //   } else if (state === 200) {
  //     axios
  //       .put(
  //         `https://my-json-server.typicode.com/codegym-vn/mock-api-users/users/{${userId}}`,
  //         user
  //       )
  //       .then((res) => {
  //         alert(`Add user success`);
  //       });
  //   }
  // };

  const handleSubmitUser = (event) => {
    event.preventDefault();
    const baseUrl =
      "https://my-json-server.typicode.com/codegym-vn/mock-api-users/users";
    const isUpdate = state === 200;
    const { url, method, title } = getRequestDettails(
      baseUrl,
      userId,
      isUpdate
    );

    axios({method: method, url: url, data: user})
      .then((res) => {
        alert(title);
        if (isUpdate) {
          setUser(user);
        } else {
          navigate("/users", { state: { user } });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getRequestDettails = (baseUrl, id, isUpdate) => {
    if (isUpdate) {
      const url = `${baseUrl}/${id}`;
      return { url, methodd: "put", title: "Update user successfully" };
    } else {
      const url = baseUrl;
      return { url, methodd: "post", title: "Add user successfully" };
    }
  };

  const handleChangeArticle = (event) => {
    setArticle((preArticle) => ({
      ...preArticle,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmitArticle = (event) => {
    event.preventDefault();
    console.log(article);
    isArticle
      ? axios
          .post(
            `https://my-json-server.typicode.com/codegym-vn/mock-api-articles/articles`,
            article
          )
          .then((res) => {
            alert(`Add article success`);
          })
          .catch((err) => {})
          .finally(() => {
            setArticle({ ...article, id: count });
            setCount(count + 1);
            articles.push(article);
            setArticles(articles);
          })
      : axios
          .put(
            `https://my-json-server.typicode.com/codegym-vn/mock-api-articles/articles/${article.id}`,
            article
          )
          .then((res) => {
            alert(`Edit article success`);
          })
          .catch((err) => {})
          .finally(() => {
            let updatedArticles = [...articles];
            updatedArticles[articles.findIndex((x) => x.id === article.id)] =
              article;
            setArticles(updatedArticles);
          });
  };

  const handleSubmitArticle_v02 = (event) => {
    event.preventDefault();
    const baseUrl = `https://my-json-server.typicode.com/codegym-vn/mock-api-articles/articles`;
    const url = isArticle ? `${baseUrl}/${article.id}` : baseUrl;
    const axiosMethod = isArticle ? axios.put : axios.post;

    //Nên dùng axios.(tên phương thức) (vd: axios.get,get..) thay vì dùng axios({method: ...})
    axiosMethod(url, article)
      .then((res) => {
        const updatedArticles = !isArticle
          ? [...articles, { ...article, id: count }]
          : articles.map((item) => (item.id === article.id ? article : item));
        setArticles(updatedArticles);
        alert(
          !isArticle
            ? "Add article  successfully"
            : "Update article successfully"
        );
        if (!isArticle) {
          setCount(count + 1);
        }
        setArticleState(false);
        setArticle({});
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEditArticle = (articleId) => {
    setArticle(articles.filter((item) => item.id === articleId)[0]);
    setArticleState(true);
  };

  const handleDeleteArticle = (articleId) => {
    axios
      .delete(
        `https://my-json-server.typicode.com/codegym-vn/mock-api-articles/articles/${articleId}`
      )
      .then((res) => {
        alert("Delete article successfully");
      })
      .catch((err) => {})
      .finally(() => {
        setArticles(articles.filter((item) => item.id !== articleId));
      });
  };

  const title = () => {
    switch (state) {
      case 0:
        return "Add";
      case 200:
        return "Edit";
      default:
        return false;
    }
  };

  return (
    <div>
      {!title() ? (
        <h1>User not found</h1>
      ) : (
        <>
          <h1> {title()} user</h1>
          <button onClick={() => navigate("/users")}>Back to home</button>
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={user.name || ""}
                onChange={handleChange}
              />
            </div>
            <button onClick={handleSubmitUser}>
              {title() === "Edit" ? "Update" : "Add"}
            </button>
          </form>
          {state === 200 ? (
            <>
              <h2>Article</h2>
              <form>
                <div>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={article.title || ""}
                    onChange={handleChangeArticle}
                  />
                </div>
                <button type="button" onClick={handleSubmitArticle_v02}>
                  {" "}
                  {!isArticle ? "Add" : "Update"}
                </button>
              </form>
              {articles.length > 0 ? (
                <>
                  <h3>Articles</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((article, index) => (
                        <tr key={index}>
                          <td>{article.title}</td>
                          <td>
                            <button
                              onClick={() => handleEditArticle(article.id)}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(article.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : null}
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

export default UserDetail;
