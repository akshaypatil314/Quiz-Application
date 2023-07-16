import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import ShowQuestions from "./components/ShowQuestions";
import QuizGenerator from "./components/QuizGenerator";
import QuizPage from "./components/QuizPage";
import ShowUserResponse from "./components/ShowUserResponse";


const App = () => {

  document.body.style.backgroundColor = "#010b1c";
  document.body.style.color = "white";
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/user" element={<QuizPage />} />
        <Route path="/admin/show-question" element={<ShowQuestions />} />
        <Route path="/admin/generate-quiz" element={<QuizGenerator />} />
        <Route path="/admin/validate-answer" element={<ShowUserResponse />} />
      </Routes>
    </Router>
  );
};

export default App;
