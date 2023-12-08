import FormTitle from "../loginAndSignup/FormTitle";
import "../../style/login.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CalToday } from "../common/Calday";
import ShowPassword from "../loginAndSignup/ShowPassword";

const Signup = () => {
  const navigate = useNavigate();
  const today = CalToday();
  const auth = sessionStorage.getItem("token");
  const [checkMsg, setCheckMsg] = useState('');
  const [isDuplCheck, setIsDuplCheck] = useState(false);
  
  useEffect(() => {
    if (auth) navigate(`/user/${today}/아침`);
  }, [auth, navigate, today])

  /** 회원 가입 */
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    if(!isDuplCheck){
      const duplicationBt = document.querySelector("#duplicationBt");
      duplicationBt.classList.add("bg-red-500");
      duplicationBt.classList.remove("bg-[#14A8DD]");
      alert("아이디 중복 확인을 해주세요");
      return;
    }
    fetch("http://10.125.121.212:8080/api/public/signup", {
      method: 'POST',
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
  })
    .then(res => {
      if(res.status === 200){
        alert("회원 가입되셨습니다. 로그인 페이지로 이동합니다.");
        navigate("/login")
      }
    })
    .catch(e => {
      console.log(e)
      alert("데이터 전송 중 에러 발생");
    });
  }

  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("invalid", () => {
      document.forms[0].classList.add("was-validated")
    })
  });

  /** 중복 아이디 검증 */
  const handleIsDuplication = (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    if(!(/^[a-zA-Z0-9]{5,20}$/.test(username))) {
      alert("아이디는 5자이상 20자 이내의 영문과 숫자를 포함하여야합니다.");
      return;
    }
    if(isDuplCheck) return;
    fetch("http://10.125.121.212:8080/api/public/searchDuplicatedName", {
      method: "Post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": username
      })
    })
      .then(res => {
        if (res.status === 200) {
          const duplicationBt = document.querySelector("#duplicationBt");
          duplicationBt.classList.remove("bg-red-500");
          duplicationBt.classList.remove("bg-[#14A8DD]");
          duplicationBt.classList.remove("hover:bg-[#3A84F5]");
          duplicationBt.classList.remove("hover:cursor-pointer");
          duplicationBt.classList.add("hover:cursor-not-allowed");
          duplicationBt.classList.add("bg-gray-700");
          duplicationBt.disabled = true;
          alert("사용할 수 있는 아이디입니다.");
          setIsDuplCheck(true);
        } else {
          alert("중복된 아이디입니다.");
        }
      })
      .catch(e => {
        console.log(e);
        alert("데이터 전송 중 에러 발생");
      })
  }

  const handleGoBack = () => {
    navigate("/login");
  }

  const handleCheckPassword = () => {
    const password = document.querySelector("#password").value;
    const checkPassword = document.querySelector("#checkPassword").value;
    const checkMsgContainer = document.querySelector("#checkMsg");

    if(!checkPassword){
      setCheckMsg('');
      return;
    }
    if (password !== checkPassword) {
      setCheckMsg("비밀번호가 일치하지 않습니다.");
      checkMsgContainer.classList.add("text-red-700");
      checkMsgContainer.classList.remove("text-blue-700");
    } 
    else if (password === checkPassword) {
      setCheckMsg("비밀번호가 일치합니다.");
      checkMsgContainer.classList.add("text-blue-700");
      checkMsgContainer.classList.remove("text-red-700");
    }
  }

  const handleChange = () => {
    setIsDuplCheck(false);
    const duplicationBt = document.querySelector("#duplicationBt");
    duplicationBt.classList.remove("bg-red-500");
    duplicationBt.classList.add("bg-[#14A8DD]");
    duplicationBt.classList.add("hover:bg-[#3A84F5]");
    duplicationBt.classList.add("hover:cursor-pointer");
    duplicationBt.classList.remove("hover:cursor-not-allowed");
    duplicationBt.classList.remove("bg-gray-700");
    duplicationBt.disabled = false;
  }

  return (
    <div className="border-2 w-4/5 h-[70%] max-w-[50rem] min-h-[30rem] m-auto shadow-xl p-2 flex flex-col items-center justify-center rounded-lg relative">
      <div className='pb-8 border-b w-full h-[10%] items-center flex justify-center'>
        <FormTitle text1={"회원가입시 서비스를 이용하실 수 있습니다"} />
      </div>
      <form className="w-full h-[70%] p-4 flex flex-col justify-center items-center">
        <div className="flex flex-col w-full max-w-[33rem] justify-center items-center relative p-2">
          <label htmlFor="username" className="hidden">아이디</label>
          <input id="username" onChange={handleChange} className="w-full max-w-[33rem] h-14 py-1 pl-4 mb-2 border rounded-lg shadow-inner"
            name="username" type="text" placeholder="🙍‍♂️  아이디는 5~20자의 영문, 숫자입니다." maxLength={20}
            required title="아이디는 5자이상 20자 이내의 영문과 숫자를 포함하여야합니다." pattern="^[a-zA-Z0-9]{5,20}$" />
          <button id="duplicationBt" onClick={handleIsDuplication} 
            className="absolute top-[1.7rem] right-4 flex flex-col h-8 text-white rounded-md whitespace-nowrap hover:cursor-pointer
            drop-shadow-lg bg-[#14A8DD] hover:bg-[#3A84F5] justify-center text-[50%] p-2 md:text-[70%] md:w-20 border items-center">
            중복확인
          </button>
          <label htmlFor="password" className="hidden">비밀번호</label>
          <div className="w-full max-w-[33rem] relative">
            <input id="password"
              className="w-full max-w-[33rem] h-14 py-1 pl-4 mb-2 border rounded-lg shadow-inner"
              name="password" type="password" placeholder="🔒  비밀번호는 10~20자의 영문,숫자,특수문자입니다." maxLength={20}
              required title="비밀먼호는 10자 이상, 20자 이내의 영어 대소문자, 숫자, 특수문자를 포함하여야합니다."
              pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$]).{10,20}$" />
            <ShowPassword/>
          </div>
          <div className="w-full max-w-[33rem] relative">
            <input id="checkPassword"
              className="w-full max-w-[33rem] h-14 p-y-1 pl-4 border rounded-lg shadow-inner" onChange={handleCheckPassword}
              name="password" type="password" placeholder="🔒  비밀번호 확인" maxLength={20}
              required title="비밀먼호는 10자 이상, 20자 이내의 영어 대소문자, 숫자, 특수문자를 포함하여야합니다."
              pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$]).{10,20}$" />
            <ShowPassword/>
          </div>
          <div id="checkMsg" className="mb-5 mt-1 text-[30%] w-full md:text-sm whitespace-nowrap flex flex-col items-start">{checkMsg}</div>
          <div className="w-full items-center justify-center flex flex-col h-[30%]">
            <button onClick={handleSubmit}
              className='border mb-2 drop-shadow-lg w-full h-[4rem] text-white rounded-md bg-[#14A8DD] hover:bg-[#3A84F5] hover:cursor-pointer'>
                  회원가입
            </button>
            <div className='flex items-center w-full'>
              <span className='border w-1/3'></span>
              <button onClick={handleGoBack}
                className='text-sm sm:text-base flex flex-col h-10 rounded-md drop-shadow-lg grow justify-center whitespace-nowrap mx-1 text-gray-500 items-center hover:text-gray-600'>
                    로그인하기
              </button>
              <span className='border w-1/3'></span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signup