import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

const Main = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(!token){
      alert("로그인이 필요한 서비스입니다");
      navigate("../login");
    }      
  })

  return (
    <div>
        <nav className="flex items-center gap-4">
            <Link to={'/main/add/diet'} className="whitespace-nowrap">식단추가</Link>
            <Link to={'/main/add/activity'} className="whitespace-nowrap">활동추가</Link>
        </nav>
    </div>
  )
}

export default Main