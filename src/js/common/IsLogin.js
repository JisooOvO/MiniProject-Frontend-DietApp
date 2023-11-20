import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IsLogin = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }
    // eslint-disable-next-line
  },[])
}

export default IsLogin;