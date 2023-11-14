import { Link } from 'react-router-dom';
import './login.module.css'

const login = () => {
  return (
    <div className="border-2 w-4/5 h-80 m-auto shadow-xl flex flex-col items-center justify-center">
      <div className="flex flex-col items-center m-4 font-bold text-2xl">로그인하세요</div>
      <div className="flex flex-col items-center">
        <form method="POST" action="http://10.125.121.212:8080/login">
            <div className="mb-4 flex flex-col justify-center items-center">
              <label for="name" className="hidden">아이디</label>
              <input className="md:w-96" name="id" type="text" placeholder="아이디" required maxLength={10}/>
              <label for="password" className="hidden">비밀번호</label>
              <input className="md:w-96" name="password" type="password" placeholder="비밀번호" required maxLength={12}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
              <input className="hover:cursor-pointer" type="submit" value="로그인"/>
              <Link to={'/signUp'} ><button>회원가입</button></Link>
            </div>
        </form>
      </div>
    </div>
  );
};

export default login;