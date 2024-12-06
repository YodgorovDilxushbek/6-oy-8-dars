import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [auth, setAuth] = useState("");
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  // Foydalanuvchilarni olish
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // Postlarni olish
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      });
  }, []);

  const addUser = (e) => {
    e.preventDefault();
    const newUser = { id: users.length + 1, name, email };
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  };

  const addBook = (e) => {
    e.preventDefault();
    const newBook = {
      id: books.length + 1,
      title,
      auth,
      status: "O'qilmagan",
    };
    setBooks([...books, newBook]);
    setTitle("");
    setAuth("");
  };

  const toggleStatus = (id) => {
    const updatedBooks = books.map((book) =>
      book.id === id
        ? { ...book, status: book.status === "O'qilgan" ? "O'qilmagan" : "O'qilgan" }
        : book
    );
    setBooks(updatedBooks);
  };

  const deleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const results = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    setFilteredPosts(results);
  };

  const fetchMovies = () => {
    const apiKey = "c5c6095";
    const url = `http://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "False") {
          setError("Film topilmadi!");
          setMovies([]);
        } else {
          setMovies(data.Search);
          setError("");
        }
      })
      .catch(() => {
        setError("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring!");
        setMovies([]);
      });
  };

  return (
    <div className="container mx-auto p-4 bg-base-100 shadow-lg rounded-lg mt-10 space-y-10">
      <h1 className="text-3xl font-bold text-center mb-8">DaisyUI Funksiyalar Jamlanmasi</h1>

      {/* Foydalanuvchi Qo'shish */}
      <div>
        <h2 className="text-xl font-semibold text-primary mb-4">Foydalanuvchilar</h2>
        <form onSubmit={addUser} className="form-control gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ism"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Qo'shish
          </button>
        </form>
        <ul className="mt-4">
          {users.map((user) => (
            <li key={user.id} className="card shadow-md bg-base-200 p-4 mb-2">
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>

      {/* Kitoblar */}
      <div>
        <h2 className="text-xl font-semibold text-secondary mb-4">Kitoblar</h2>
        <form onSubmit={addBook} className="form-control gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Kitob nomi"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            value={auth}
            onChange={(e) => setAuth(e.target.value)}
            placeholder="Muallif"
            className="input input-bordered w-full"
            required
          />
          <button type="submit" className="btn btn-secondary w-full">
            Qo'shish
          </button>
        </form>
        <ul className="mt-4">
          {books.map((book) => (
            <li key={book.id} className="card shadow-md bg-base-200 p-4 mb-2">
              <p>{book.title} - {book.auth}</p>
              <p>Status: {book.status}</p>
              <button
                onClick={() => toggleStatus(book.id)}
                className="btn btn-sm btn-outline mt-2"
              >
                Statusni o'zgartirish
              </button>
              <button
                onClick={() => deleteBook(book.id)}
                className="btn btn-sm btn-error mt-2"
              >
                O'chirish
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Ishlarni Filtrlash */}
      <div>
        <h2 className="text-xl font-semibold text-accent mb-4">Ishlarni Filtrlash</h2>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Qidiruv"
          className="input input-bordered w-full mb-4"
        />
        <ul className="grid grid-cols-1 gap-4">
          {filteredPosts.map((post) => (
            <li key={post.id} className="card shadow-md bg-base-200 p-4">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Filmlar Qidiruvi */}
      <div>
        <h2 className="text-xl font-semibold text-warning mb-4">Filmlar Qidiruvi</h2>
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Film nomini kiriting"
          className="input input-bordered w-full mb-2"
        />
        <button onClick={fetchMovies} className="btn btn-warning w-full mb-4">
          Qidirish
        </button>
        {error && <p className="text-error">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="card bg-base-200 shadow-md p-4">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                alt={movie.Title}
                className="w-full h-64 object-cover mb-2"
              />
              <h3 className="text-lg font-bold">{movie.Title}</h3>
              <p>Yili: {movie.Year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
