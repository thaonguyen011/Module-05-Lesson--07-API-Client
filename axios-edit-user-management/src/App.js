import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import Articles from "./pages/Articles";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/user/add/" element={<UserDetails />} />
        <Route path={`/user/:userId`} element={<UserDetails />} />
        <Route path={`/articles`} element={<Articles/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
