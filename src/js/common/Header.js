import { Link, useNavigate } from "react-router-dom"
import logo from "../../images/logo.png"
import "../../style/responsive.css"
import { LuUser2 } from "react-icons/lu";
import { useState } from "react";
import { CalToday } from "./Calday";

const Header = () => {
  const today = CalToday();
  const [isClick, setIsClick] = useState(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const handleClick = () => {
    setIsClick(true);
  }
  const handleLogInAndOut = (e) => {
    if(token){
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      alert("로그아웃되었습니다. 메인 페이지로 이동합니다.");
      navigate("/");
      window.location.reload();
    }else{
      navigate("/login");
    }
  }
  return (
    <header tabIndex={-1} onBlur={()=>{setIsClick(false)}} className="w-full h-12 z-10 drop-shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-between items-center px-4">
        <Link to={''} className="flex flex-col justify-center text-white items-center font-bold text-2xl">
          <img id="logo" src={logo} alt="logo" className="hover:opacity-70"/>
        </Link>
        <ul className="flex gap-2">
           <li 
            onMouseEnter={()=>{
              const hoverText1 = document.querySelector("#hoverText1");
              hoverText1.classList.remove("hidden");
            }}
            onMouseLeave={()=>{
              const hoverText1 = document.querySelector("#hoverText1");
              hoverText1.classList.add("hidden");
            }}
            className="border relative rounded-[50%] w-7 h-7 flex justify-center items-center bg-white drop-shadow-md hover:cursor-pointer hover:bg-slate-200">
            <Link to={`userCalendar`}>📅</Link>
            <span id="hoverText1" className="absolute hidden top-7 text-sm w-32 h-10 flex items-center justify-center">달력 보기</span>
          </li>
          <li 
            onMouseEnter={()=>{
              const hoverText2 = document.querySelector("#hoverText2");
              hoverText2.classList.remove("hidden");
            }}
            onMouseLeave={()=>{
              const hoverText2 = document.querySelector("#hoverText2");
              hoverText2.classList.add("hidden");
            }}
            className="border relative rounded-[50%] w-7 h-7 flex justify-center items-center bg-white drop-shadow-md hover:cursor-pointer hover:bg-slate-200">
            <Link to={`user/${today}/아침`}>🥗</Link>
            <span id="hoverText2" className="absolute hidden top-7 text-sm w-32 h-10 flex items-center justify-center">오늘 식단 등록하기</span>
          </li>
          <li
          onClick={handleClick}
          onMouseEnter={()=>{
            const hoverText3 = document.querySelector("#hoverText3");
            hoverText3.classList.remove("hidden");
          }}
          onMouseLeave={()=>{
            const hoverText3 = document.querySelector("#hoverText3");
            hoverText3.classList.add("hidden");
          }}
          className="border relative rounded-[50%] w-7 h-7 flex justify-center items-center bg-white drop-shadow-md hover:cursor-pointer hover:bg-slate-200">
            <LuUser2/>
            <span id="hoverText3" className="hidden absolute top-7 text-sm w-32 -right-10 h-10 flex items-center justify-center">로그인 관리</span>
            {isClick ? 
              <div onClickCapture={handleLogInAndOut} className="absolute z-[9999] pointer-events-[fill] flex justify-center items-center p-1 h-12 top-full mt-1 border bg-white hover:bg-slate-200 rounded-md text-sm sm:text-base w-28 sm:w-44 -left-20 sm:-left-36">
              {token ? "로그아웃하기" : "로그인하기"}
            </div> : ''}
          </li>
        </ul>
    </header>
  )
}

export default Header