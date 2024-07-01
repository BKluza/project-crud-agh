import { useEffect, useState } from "react";
import { AuthorsList } from "./components/AuthorsList";
import { AddAuthor } from "./components/AddAuthor";
import './App.css';

const API_URL = "http://localhost:8000";

function App() {
  const [authors, setAuthors] = useState([]);

  const onDeleteAuthorClickHandler = (authorId) => {
    fetch(`${API_URL}/authors/${authorId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200)
      {
        setAuthors((prevAuthors) =>
          prevAuthors.filter((author) => author.id !== authorId)
        );
      }
    });
  };

  const onAddAuthorSubmitHandler = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const surname = event.target.surname.value;

    fetch(`${API_URL}/authors`, {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id)
        {
          setAuthors((prevAuthors) => [...prevAuthors, data]);
        }
      });
  };

  useEffect(() => {
    fetch(`${API_URL}/authors`)
      .then((res) => res.json())
      .then((data) => setAuthors(data));
  }, []);

  return (
    <>
      <h1>Author - CRUD</h1>
      <h3>(ale U tylko w nazwie)</h3>
      
      <AddAuthor onAdd={onAddAuthorSubmitHandler} />
      <AuthorsList authors={authors} onDelete={onDeleteAuthorClickHandler} />

      <p>Poskładane razem przez Bartosza Kluzę
        <br></br>
        IFS - AGH 2024
      </p>
    </>
  );
}

export default App;
