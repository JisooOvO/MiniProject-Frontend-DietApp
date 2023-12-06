const ShowPassword = () => {
  const handleShowPassword = (e) => {
    e.preventDefault();
    const targetPasswordInput = e.target.previousSibling;
    if(targetPasswordInput.type === "text")
        targetPasswordInput.type = "password";
    else
        targetPasswordInput.type = "text";
  }
  
  return (
    <div 
        tabIndex={-1}
        onMouseEnter={(e)=>{
            if(e.target.tagName !== "BUTTON") return;
            const text = e.target.childNodes[1];
            text.classList.remove("hidden")
        }} 
        onMouseLeave={(e)=>{
            if(e.target.tagName !== "BUTTON") return;
            const text = e.target.childNodes[1];   
            text.classList.add("hidden")
        }} onClick={handleShowPassword} className="absolute top-4 right-4 border w-7 h-7 rounded-[50%] flex justify-center items-center bg-gray-400 shadow-md hover:cursor-pointer hover:bg-[#EAEAEA]">
        🔍
        <span id="text" className="hidden whitespace-nowrap absolute top-7 text-sm">비밀번호 보기</span>
    </div>
  )
}

export default ShowPassword