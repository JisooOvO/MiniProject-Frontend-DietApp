import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./js/Login.js";
import Header from "./js/Header.js";
import Signup from "./js/Signup.js";

function App() {
  let Auth = false;
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        { Auth || <Route path="/" element={<Login/>}></Route> }
        <Route path="/signUp" element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
