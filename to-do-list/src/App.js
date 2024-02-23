import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [state, setState] = useState({
    list: [],
    form: {},
    isCreated: false,
  });

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      form: { ...prevState.form, [event.target.name]: event.target.value },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("https://jsonplaceholder.typicode.com/todos", state.form)
    .then((res) => {console.log(res)})
    .catch((err) => {throw err});
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      setState((prevState) => ({ ...prevState, list: res.data }));
    });
  });

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={state.form.title || ""}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {state.list.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
