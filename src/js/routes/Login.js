import { Link, useNavigate } from 'react-router-dom';
import "../../style/login.css"
import googlelogo from "../../images/googlelogo.png"
import FormTitle from '../common/FormTitle';
import { useEffect } from 'react';
import { CalToday } from '../common/Calday';

const Login = () => {
  const navigate = useNavigate();
  const today = CalToday();
  const auth = sessionStorage.getItem("token");
  const isOauth2 = false;
  
  useEffect(()=>{
    // 여기 수정
    if(auth) navigate(`/user/${today}/아침`);
    // eslint-disable-next-line
  },[])

  const handleLoginButton = function() {
    let username = document.querySelector("#id").value;
    let password = document.querySelector("#password").value;

    fetch('http://10.125.121.212:8080/login',{
      method : "POST",
      body : JSON.stringify({
        "username" : username,
        "password" : password
    })})
    .then(res => {
      const auth = res.headers.get("Authorization");
      if (auth) {
        sessionStorage.setItem("token",auth);
        alert("로그인에 성공했습니다. 유저 페이지로 이동합니다.");
        navigate(`/user/${today}/아침`);
      }else{
        alert("로그인 정보와 일치하지 않습니다.");
      }
    }).catch(e => console.log(e))
  };

  const handleGoogleoauth = () => {
    fetch('http://10.125.121.212:8080/oauth',{
      method : 'POST',
    })
    .then(res => console.log(res))
    .then(data => console.log(data))
    .catch(e => console.log(e))
  };

  return (
    <div className="border-2 w-4/5 min-h-[400px] h-[70%] m-auto shadow-xl flex flex-col items-center rounded-lg relative">
      <FormTitle text1={"로그인이 필요한"} text2={" 서비스입니다."}/>
      <div className="flex flex-col items-center h-[30%]">
      <div className="mb-4 flex flex-col mt-36 justify-center items-center">
          <label htmlFor="id" className="hidden">아이디</label>
            <input id="id" className="md:w-[32rem] h-10 p-1 mb-[8%] border-b" 
            name="id" type="text" placeholder="아이디" required/>
          <label htmlFor="password" className="hidden">비밀번호</label>
            <input id='password' className="md:w-[32rem] h-10 p-1 mb-[8%] border-b" 
            name="password" type="password" placeholder="비밀번호" required/>
      </div>
      <div id='loginButtonContainer' className="grid grid-col-1 w-[11rem] grid-rows-1 gap-2 md:grid-cols-2 md:w-[32rem] items-center justify-center">
        <input id='loginSubmit' onClick={handleLoginButton} defaultValue={"로그인"} className="border drop-shadow-lg 
        text-white rounded-md bg-[#14A8DD] hover:bg-[#3A84F5] hover:cursor-pointer"/>    
        <Link to={'/signUp'} id='signUp' className='flex flex-col h-10 text-white rounded-md drop-shadow-lg bg-[#14A8DD]
          hover:bg-[#3A84F5] justify-center text-lg border items-center'>회원가입</Link>
        <div className='col-span-2 hover:cursor-pointer' onClick={handleGoogleoauth}>
          { isOauth2 ? <div id='googleLogin' className='flex h-10 text-white rounded-md drop-shadow-lg bg-[#14A8DD]
          hover:bg-[#3A84F5] justify-center text-lg border items-center'>
            <img src={googlelogo} alt='googlelogo' className='w-6 h-6'/><span>&nbsp; 구글 로그인</span>
          </div> : ''}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;