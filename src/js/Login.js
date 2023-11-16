import { Link, useNavigate } from 'react-router-dom';
import "../style/login.css"

const Login = () => {
  const navigate = useNavigate();

  const handleLoginButton = function() {
    console.log('hi')
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
        localStorage.setItem("token",auth);
        alert("로그인에 성공했습니다");
        navigate("/main");
      }else{
        alert("로그인 정보와 일치하지 않습니다");
      }
    }).catch(e => console.log(e))
  };

  return (
    <div className="border-2 w-4/5 h-[70%] m-auto shadow-xl flex flex-col items-center rounded-lg justify-center">
      <div className="flex flex-col items-center mb-[8%] font-bold text-[#07B5D5] whitespace-nowrap h-[5%] text-[150%]">로그인이 필요한 서비스입니다</div>
      <div className="flex flex-col items-center h-[30%]">
      <form action="#">
      <div className="mb-4 flex flex-col justify-center items-center">
          <label htmlFor="name" className="hidden">아이디</label>
            <input id="id" className="md:w-96 h-10 p-1 mb-[8%] border-b" name="id" type="text" placeholder="아이디" required/>
          <label htmlFor="password" className="hidden">비밀번호</label>
            <input id='password' className="md:w-96 h-10 p-1 mb-[8%] border-b" name="password" type="password" placeholder="비밀번호" required/>
      </div>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 items-center justify-center">
        <input id='loginSubmit' onClick={handleLoginButton} value={"로그인"} className="border w-44 drop-shadow-lg text-white rounded-md bg-[#14A8DD] hover:bg-[#3A84F5] hover:cursor-pointer"/>
        <Link to={'/signUp'} className='flex flex-col h-10 text-white rounded-md drop-shadow-lg bg-[#14A8DD] hover:bg-[#3A84F5] justify-center text-lg w-44 border items-center'>회원가입</Link>
      </div>
      </form>
      </div>
    </div>
  );
};

export default Login;