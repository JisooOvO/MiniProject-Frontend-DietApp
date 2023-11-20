import FormTitle from "../common/FormTitle";
import "../../style/login.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CalToday } from "../common/Calday";

const Signup = () => {
  const navigate = useNavigate();
  const today = CalToday();
  const auth = localStorage.getItem("token");

  useEffect(()=>{
    // 여기 수정
    if(auth) navigate(`/user/${today}/아침`);
  },[auth,navigate,today])

  const handleSubmit = () => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    fetch("http://10.125.121.212:8080/signUp",{
      method : 'POST',
      body : {
        "username" : username,
        "password" : password
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(e => console.log(e));
  }

  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("invalid", () => {
      document.forms[0].classList.add("was-validated")
    })
  });

  const handleIsDuplication = () => {
    //중복 아이디 검증
  }

  const handleGoBack = () => {
    navigate("/login");
  }

  return (
    <div className="border-2 w-4/5 min-h-[400px] h-[70%] m-auto shadow-xl 
    flex flex-col items-center rounded-lg relative">
      <FormTitle text1={"회원가입시 다양한 서비스를"} text2={"이용하실 수 있습니다"}/>
      <form action="#">
        <div className="h-full flex flex-col justify-center items-center">
            <div className="relative mr-14 md:mr-0">
              <label htmlFor="username" className="hidden">아이디</label>
              <input id="username" className="md:w-96 w-[14rem] h-10 p-1 border-b"
              name="username" type="text" placeholder="아이디" maxLength={20}
              required title="아이디는 5자 이상, 20자 이내의 영문과 숫자를 포함하여야합니다." pattern="^[a-zA-Z0-9]{5,20}$"/>
              <div className="mb-10 mt-1 text-gray-500 text-[30%] w-[14rem] md:text-sm whitespace-nowrap
              flex justify-start md:w-96">아이디는 5자 이상, 20자 이내의 영문과 숫자의 조합입니다.</div>
              <button onClick={handleIsDuplication} className="flex flex-col top-0 -right-20 
              md:-right-24 absolute h-10 text-white rounded-md 
              drop-shadow-lg bg-[#14A8DD] hover:bg-[#3A84F5] 
              justify-center text-[70%] p-2 md:text-sm md:w-20 border items-center">중복확인</button>
            </div>
            <div className="mr-14 md:mr-0">
              <label htmlFor="password" className="hidden">비밀번호</label>
              <input id="password" className="md:w-96 w-[14rem] h-10 p-1 border-b"
              name="password" type="password" placeholder="비밀번호" maxLength={18}
              required title="비밀먼호는 10자 이상, 20자 이내의 영어 대소문자, 숫자, 특수문자(!,@,#,$)를 포함하여야합니다."
              pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$]).{10,20}$"/>
              <div className="mb-10 mt-1 text-gray-500 text-[30%] w-[14rem] md:text-sm whitespace-nowrap
              flex flex-col items-start md:w-96">
                <div>비밀번호는 10자 이상, 20자 이내의</div>
                <div>영문과 숫자, 특수문자(!,@,#,$)의 조합입니다.</div>
              </div>
            </div>
          <div className="grid md:grid-cols-2 gap-2">
            <button onClick={handleGoBack} className='flex flex-col h-10 text-white rounded-md
            drop-shadow-lg bg-[#14A8DD]
            hover:bg-[#3A84F5] justify-center text-lg w-44 border items-center'>뒤로가기</button>
            <input id="signUp"
            onClick={handleSubmit}
            className='flex flex-col h-10 text-white rounded-md
            drop-shadow-lg bg-[#14A8DD]
            hover:bg-[#3A84F5] justify-center text-lg w-44 border items-center'
            type="submit" value="회원가입"/>
          </div>
        </div>
    </form>
    </div>
  )
}

export default Signup