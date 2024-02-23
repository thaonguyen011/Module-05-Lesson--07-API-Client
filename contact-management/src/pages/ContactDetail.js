import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ContactDetail() {
  const [contact, setContact] = useState({});
  const [image, setImage] = useState({});
  const [isValid, setValid] = useState();
  const { contactId } = useParams();

  useEffect(() => {
    if (contactId) {
      axios
        .get(
          ` https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts/${contactId}`
        )
        .then((res) => {
          setContact(res.data);
          setValid("valid");
        })
        .catch((err) => {
          setValid("not found");
          console.log(err);
        });
    }
  }, [contactId]);

  const handleChange = (event) => {
    setContact((prevContact) => ({
      ...prevContact,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSelectedImage = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("file", image);
    fd.append("upload_preset", "z8axohay");

    axios
      .post("https://api.cloudinary.com/v1_1/dkcqcad7s/image/upload", fd)
      .then((res) => {
        console.log(res.data.secure_url);
        // addContact(res.data.Url);
        alert('success')
      })
      .catch((err) => {
          console.log(err);
      });
  };

  // Example code to show how to upload images using an unsigned preset
  // and a form.

  // Note, for security reasons, the upload preset used in this example
  // sets the access control mode of the uploaded assets to restricted,
  // so the URLs returned in the response will return 404 errors.

  // const url = "https://api.cloudinary.com/v1_1/dkcqcad7s/image/upload";
  // const form = document.querySelector("form");

  // form.addEventListener("submit", (e) => {
  //   e.preventDefault();

  //   const files = document.querySelector("[type=file]").files;
  //   const formData = new FormData();

  //   for (let i = 0; i < files.length; i++) {
  //     let file = files[i];
  //     formData.append("file", file);
  //     formData.append("upload_preset", "docs_upload_example_us_preset");

  //     fetch(url, {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((response) => {
  //         return response.text();
  //       })
  //       .then((data) => {
  //         document.getElementById("data").innerHTML += data;
  //       });
  //   }
  // });

  const addContact = (imageUrl = "") => {
    axios
      .post(
        " https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts",
        { ...contact, image: imageUrl }
      )
      .then((res) => {
        alert((isValid ? "Edit" : "Add") + "succesfully");
      })
      .catch((err) => {
        throw err;
      });
  };

  let content;
  if (isValid === "not found") {
    content = <h1>Not found</h1>;
  } else if (isValid === "valid") {
    content = <h1>Edit contact</h1>;
  } else {
    content = <h1>Add contact</h1>;
  }
  return (
    <div>
      {" "}
      {content}
      <form>
        <img src={contact.image} alt="" />
        <input type="file" onChange={handleSelectedImage} />
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={contact.name || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={contact.email || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={contact.phone || ""}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default ContactDetail;
