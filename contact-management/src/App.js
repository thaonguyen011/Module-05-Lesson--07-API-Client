import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contacts from "./pages/Contacts";
import ContactDetail from "./pages/ContactDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/add" element={<ContactDetail />} />
        <Route path={`/contacts/edit/:contactId`} element={<ContactDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
