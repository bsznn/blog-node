import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Publish from "./pages/Publish";
import PrivateRoute from "./components/PrivateRoute";
import UpdateArticle from "./components/UpdateArticle";
import ArticleDetail from "./pages/ArticleDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ErrorAuth from "./pages/ErrorAuth";

export default function App() {
  return (
    <main className="container mt-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/error-auth" element={<ErrorAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={<PrivateRoute roles={["admin", "user"]} />}>
          <Route path="articles/new" element={<Publish />} />
          <Route path="edit/:id" element={<UpdateArticle />} />
        </Route>

          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}
