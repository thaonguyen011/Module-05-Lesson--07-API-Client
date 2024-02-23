import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts"
      )
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const handleDelete = (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      axios
        .delete(
          `https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts/${contactId}`
        )
        .then(() => {
          alert("Delete success");
          setContacts(contacts.filter((contact) => contact.id !== contactId));
        })
        .catch((err) => {
          throw err;
        });
    }
  };
  return (
    <div>
      <h1>Contacts</h1>
      <button onClick={() => navigate("/contacts/add")}>Add contact</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <button onClick={() => navigate(`/contacts/edit/${item.id}`)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Contacts;
