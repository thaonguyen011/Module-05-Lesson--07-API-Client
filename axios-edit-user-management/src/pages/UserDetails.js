import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function UserDetails() {
  const { userId } = useParams();
  const isCreate = !userId;
  const [ user, setUser ] = useState({});

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3001/api/users/${userId}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [userId]);

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit() {
    axios
      .post("http://localhost:3001/api/users", user)
      .then((res) => {
        alert(
          `${isCreate ? "Create" : "Edit"} user ${JSON.stringify(
            res.data
          )} successfully`
        );
      })
      .catch((err) => {
        throw err;
      });
  }

  return (
    <div>
      <h1>User Details</h1>
      <Link to={`/articles?userId=${user.id}`}>Articles</Link>
      <form>
        <div>
          <label>Id</label>
          <input name="id" value={user.id || ""} onChange={handleChange} />
        </div>
        <div>
          <label>Name</label>
          <input name="name" value={user.name || ""} onChange={handleChange} />
        </div>
        <div>
          <label>Birthday</label>
          <input
            name="birthday"
            value={user.birthday || ""}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default UserDetails;
