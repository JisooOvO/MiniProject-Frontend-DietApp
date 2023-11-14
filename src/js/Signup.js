const Signup = () => {
  return (
    <>
    <form method="POST" action="http://10.125.121.212:8080/signUp">
        <div className="mb-4 flex flex-col justify-center items-center">
          <div>회원 가입</div>
          <label for="name" className="hidden">아이디</label>
          <input className="md:w-96" name="id" type="text" placeholder="아이디" required maxLength={10}/>
          <label for="password" className="hidden">비밀번호</label>
          <input className="md:w-96" name="password" type="password" placeholder="비밀번호" required maxLength={12}/>
          <label for="password" className="hidden">닉네임</label>
          <input className="md:w-96" name="nickname" type="text" placeholder="닉네임" required maxLength={12}/>
          <label for="password" className="hidden">이메일</label>
          <input className="md:w-96" name="email" type="email" placeholder="이메일" required/>
          <input className="hover:cursor-pointer" type="submit" value="회원가입"/>
        </div>
    </form>
    </>
  )
}

export default Signup