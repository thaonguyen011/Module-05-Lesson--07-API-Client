import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<UserDetail />} />
        <Route path={`/users/edit/:userId`} element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
