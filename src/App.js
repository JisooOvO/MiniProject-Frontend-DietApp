import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./js/routes/Login.js";
import Header from "./js/common/Header.js";
import Signup from "./js/routes/Signup.js";
import Main from "./js/routes/Main.js";
import User from "./js/routes/User.js";


function App() {

  return (
      <BrowserRouter>
        <Header/>
        <div className="w-screen flex flex-col grow">
          <Routes>
            <Route path="/" element={<Main/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signUp" element={<Signup/>}></Route>
            <Route path="/user/:date/:slot" element={<User/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>

  );
}

export default App;
