import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./js/Login.js";
import Header from "./js/Header.js";
import Signup from "./js/Signup.js";
import AddDiet from "./js/AddDiet.js";
import AddActivity from "./js/AddActivity.js";
import GetStart from "./js/GetStart.js";
import Main from "./js/Main.js";


function App() {

  return (
      <BrowserRouter>
        <Header/>
        <div className="w-screen flex flex-col grow">
          <Routes>
            <Route path="/" element={<GetStart/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/main" element={<Main/>}></Route>
            <Route path="/signUp" element={<Signup/>}></Route>
            <Route path="/main/add/diet" element={<AddDiet/>}></Route>
            <Route path="/main/add/activity" element={<AddActivity/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>

  );
}

export default App;
