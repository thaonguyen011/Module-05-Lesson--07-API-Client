import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [state, setState] = useState({
    users: [],
    loading: false,
  });

  const getUsers = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .get("http://localhost:3001/api/users")
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      }, 3000);
    });
  };

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    getUsers()
      .then((res) =>
        setState((prevState) => ({ ...prevState, users: res.data }))
      )
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setState((prevState) => ({ ...prevState, loading: false }));
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {state.loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {state.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
