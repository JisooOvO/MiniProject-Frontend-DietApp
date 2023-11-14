import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./js/Login.js";
import Header from "./js/Header.js";
import Signup from "./js/Signup.js";
import AddDiet from "./js/AddDiet.js";
import AddActivity from "./js/AddActivity.js";
import SideBar from "./js/SideBar.js";

function App() {
  let auth = true;
  return (
    <BrowserRouter>
      <Header auth={auth}/>
      <SideBar auth={auth}/>
      <Routes>
        { auth || <Route path="/" element={<Login/>}></Route> }
        <Route path="/signUp" element={<Signup/>}></Route>
        <Route path="/add/diet" element={<AddDiet/>}></Route>
        <Route path="/add/activity" element={<AddActivity/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
