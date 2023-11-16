const Signup = () => {

  const handleSubmit = () => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const email = document.querySelector("#email").value;


    fetch("http://10.125.121.212:8080/signUp",{
      method : 'POST',
      body : {
        "username" : username,
        "password" : password,
        "email" : email
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(e => console.log(e));
  }

  return (
    <div className="border-2 w-4/5 h-[70%] m-auto shadow-xl  flex flex-col items-center rounded-lg justify-center">
      <div className="text-[#07B5D5] relative top-[-10%] text-3xl">회원 가입</div>
      <form action="#">
        <div className="h-full mb-4 flex flex-col justify-center items-center">
          <label htmlFor="name" className="hidden">아이디</label>
          <input id="username" className="md:w-96 h-10 p-1 mb-[8%] border-b" name="username" type="text" placeholder="아이디"/>
          <label htmlFor="password" className="hidden">비밀번호</label>
          <input id="password" className="md:w-96 h-10 p-1 mb-[8%] border-b" name="password" type="password" placeholder="비밀번호"/>
          <label htmlFor="password" className="hidden">이메일</label>
          <input id="email" className="md:w-96 h-10 p-1 mb-[10%] border-b" name="email" type="email" placeholder="이메일" required/>
          <input onClick={handleSubmit} className='flex flex-col h-10 text-white rounded-md drop-shadow-lg bg-[#14A8DD] hover:bg-[#3A84F5] justify-center text-lg w-44 border items-center' type="submit" value="회원가입"/>
        </div>
    </form>
    </div>
  )
}

export default Signup