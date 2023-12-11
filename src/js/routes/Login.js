import { Link, useNavigate } from 'react-router-dom';
import "../../style/login.css"
import FormTitle from '../loginAndSignup/FormTitle';
import { useEffect } from 'react';
import ShowPassword from '../loginAndSignup/ShowPassword';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlComponent = new URL(window.location.href);
    const jwt = urlComponent.searchParams.has("jwt");
    if(jwt) {
      sessionStorage.setItem("token",urlComponent.searchParams.get("jwt"));
      sessionStorage.setItem("username",urlComponent.searchParams.get("username"));
      alert("로그인에 성공했습니다. 유저 페이지로 이동합니다.");
    }
    const auth = sessionStorage.getItem("token");  
    if (auth) navigate(`/userCalendar`);
    // eslint-disable-next-line
  }, [])

  const handleLoginButton = function (e) {
    e.preventDefault();
    let username = document.querySelector("#id").value;
    let password = document.querySelector("#password").value;
    fetch('https://healthyfit3-env.eba-hmvcyftc.ap-northeast-2.elasticbeanstalk.com/login', {
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    })
    .then(res => {
      const auth = res.headers.get("Authorization");
      const username = res.headers.get("Username");
      if (res.status === 200) {
        sessionStorage.setItem("token", auth);
        sessionStorage.setItem("username",username)
        alert("로그인에 성공했습니다. 유저 페이지로 이동합니다.");
        navigate(`/userCalendar`);
      } else {
        alert("로그인 정보와 일치하지 않습니다.");
      }
    }).catch(e => console.log(e))
  };


  const handleGoogleoauth = () => {
    console.log("clicked");
    const url = 'http://10.125.121.212:8080/api/public/oauth';
    fetch(url, {
      method: 'post',
    })
    .then(res => {
      window.location.href = res.headers.get("Location")
    })
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
          <input id="id" className="w-full max-w-[33rem] h-14 py-1 pl-4 mb-5 border rounded-lg shadow-inner"
            name="id" type="text" placeholder="🙍‍♂️  아이디를 입력하세요" required />
          <label htmlFor="password" className="hidden">비밀번호를 입력하세요.</label>
          <div className="w-full max-w-[33rem] relative">
            <input id='password' className="w-full mb-5 h-14 p-y-1 pl-4 border rounded-lg shadow-inner"
              name="password" type="password" placeholder="🔒  비밀번호를 입력하세요" required/>
            <ShowPassword/>
          </div>
        </div>
        <div id='loginButtonContainer'
          className="w-full max-w-[33rem] items-center justify-center flex flex-col h-[40%]">
          <button id='loginSubmit' onClick={handleLoginButton}
          className="border mb-2 drop-shadow-lg w-full h-[4rem] text-white rounded-md bg-[#14A8DD] hover:bg-[#3A84F5] hover:cursor-pointer">
            로그인
          </button>
          <div className='flex items-center w-full'>
            <span className='border w-1/3'></span>
              <Link to={'/signUp'} id='signUp'
              className='text-sm sm:text-base flex flex-col grow rounded-md drop-shadow-lg justify-center whitespace-nowrap mx-1 text-gray-500 items-center hover:text-gray-600'>
                회원가입하기
              </Link>
            <span className='border w-1/3'></span>
          </div>
          <div className='flex items-center w-full h-10'>
            <div className='hover:cursor-pointer whitespace-nowrap flex grow justify-center' onClick={handleGoogleoauth}>
                  <span className='text-sm sm:text-base text-gray-500 hover:text-gray-600 drop-shadow-lg'>&nbsp;구글 로그인하기</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;