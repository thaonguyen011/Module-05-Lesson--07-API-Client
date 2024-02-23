
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [state, setState] = useState({
    users: [],
  });

  useEffect(() => {
    const getUsers = axios.get("http://localhost:3001/api/users");
    const getArticles = axios.get("http://localhost:3001/api/articles");
    axios
      .all([getUsers, getArticles])
      .then(
        axios.spread((res1, res2) => {
          const users = res1.data.map((user) => {
            return {
              ...user,
              article: res2.data.filter((item) => item.user_id === user.id),
            };
          });
          setState({ users: users });
        })
      )
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>article numbers</th>
          </tr>
        </thead>
        <tbody>
          {state.users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.article.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
