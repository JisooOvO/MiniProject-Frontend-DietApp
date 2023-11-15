import { Link } from 'react-router-dom';
import '../style/login.css'

const login = () => {

  const handleLoginButton = async function(e) {
    let id = document.querySelector("#id").value;
    let password = document.querySelector("#password").value;
    console.log(id,password);

    let formData = new FormData();
    formData.append('id',id);
    formData.append('password',password);

    await fetch('http://10.125.121.212:8080/login',{
      method : 'POST',
      body : JSON.stringify(formData)
    }).catch(e => console.log(e));
  }

  return (
    <div className="border-2 w-4/5 h-80 m-auto shadow-xl flex flex-col items-center justify-center">
      <div className="flex flex-col items-center m-4 font-bold text-2xl">로그인하세요</div>
      <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-col justify-center items-center">
        <label for="name" className="hidden">아이디</label>
          <input id="id" className="md:w-96" name="id" type="text" placeholder="아이디" required maxLength={10}/>
        <label for="password" className="hidden">비밀번호</label>
          <input id='password' className="md:w-96" name="password" type="password" placeholder="비밀번호" required maxLength={12}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
          <button onClick={handleLoginButton} className="hover:cursor-pointer">로그인</button>
          <Link to={'/signUp'} className='flex flex-col items-center'>회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default login;