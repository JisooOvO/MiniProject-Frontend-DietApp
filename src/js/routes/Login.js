import { Link, useNavigate } from 'react-router-dom';
import "../../style/login.css"
import googlelogo from "../../images/googlelogo.png"
import FormTitle from '../loginAndSignup/FormTitle';
import { useEffect } from 'react';
import { CalToday } from '../common/Calday';

const Login = () => {
  const navigate = useNavigate();
  const today = CalToday();
  const auth = sessionStorage.getItem("token");
  const isOauth2 = false;

  useEffect(() => {
    if (auth) navigate(`/user/${today}/아침`);
    // eslint-disable-next-line
  }, [])

  const handleLoginButton = function (e) {
    e.preventDefault();
    let username = document.querySelector("#id").value;
    let password = document.querySelector("#password").value;

    fetch('http://10.125.121.212:8080/login', {
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    })
      .then(res => {
        const auth = res.headers.get("Authorization");
        if (auth) {
          sessionStorage.setItem("token", auth);
          alert("로그인에 성공했습니다. 유저 페이지로 이동합니다.");
          navigate(`/user/${today}/아침`);
        } else {
          alert("로그인 정보와 일치하지 않습니다.");
        }
      }).catch(e => console.log(e))
  };

  const handleGoogleoauth = () => {
    fetch('http://10.125.121.212:8080/oauth', {
      method: 'POST',
    })
      .then(res => console.log(res))
      .then(data => console.log(data))
      .catch(e => console.log(e))
  };

  return (
    <div className="border-2 w-4/5 max-w-[50rem] min-h-[30rem] h-[70%] m-auto shadow-xl p-2 flex flex-col items-center justify-center rounded-lg relative">
      <div className='pb-8 border-b w-full h-[10%] items-center flex justify-center'>
        <FormTitle text1={"로그인이 필요한 서비스입니다."} />
      </div>
      <form className="w-[90%] h-[70%] p-4 flex flex-col justify-center items-center">
        <div className="flex flex-col w-full justify-center items-center p-2">
          <label htmlFor="id" className="hidden">아이디를 입력하세요.</label>
          <input id="id" className="w-[80%] max-w-[33rem] h-14 py-1 pl-4 mb-5 border rounded-lg shadow-inner"
            name="id" type="text" placeholder="🙍‍♂️  아이디를 입력하세요" required />
          <label htmlFor="password" className="hidden">비밀번호를 입력하세요.</label>
          <input id='password' className="w-[80%] max-w-[33rem] mb-5 h-14 p-y-1 pl-4 border rounded-lg shadow-inner"
            name="password" type="password" placeholder="🔒  비밀번호를 입력하세요" required />
        </div>
        <div id='loginButtonContainer'
          className="w-[80%] items-center justify-center flex flex-col h-[30%]">
          <button id='loginSubmit' onClick={handleLoginButton}
          className="border mb-2 drop-shadow-lg w-full h-[4rem] text-white rounded-md bg-[#14A8DD] hover:bg-[#3A84F5] hover:cursor-pointer">
            로그인
          </button>
          <div className='flex items-center w-full'>
            <span className='border w-1/3'></span>
            <Link to={'/signUp'} id='signUp'
            className='text-sm sm:text-base flex flex-col h-10 rounded-md drop-shadow-lg grow justify-center whitespace-nowrap mx-1 text-gray-500 items-center hover:text-gray-600'>
              회원가입하기
            </Link>
            <span className='border w-1/3'></span>
          </div>
          <div className='col-span-2 hover:cursor-pointer' onClick={handleGoogleoauth}>
            {isOauth2 ? 
            <div id='googleLogin' className='flex h-10 text-white rounded-md drop-shadow-lg bg-[#14A8DD]
            hover:bg-[#3A84F5] justify-center text-lg border items-center'>
              <img src={googlelogo} alt='googlelogo' className='w-6 h-6' /><span>&nbsp; 구글 로그인</span>
            </div> 
            : ''}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;