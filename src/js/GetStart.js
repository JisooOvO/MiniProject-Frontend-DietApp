import LinkButton from "./common/LinkButton"

const GetStart = () => {
  return (
    
    <div id="container" className="h-full bg-gradient-to-t from-cyan-500 to-slate-300">
      <div className="font-extralight drop-shadow-md text-[250%] text-white whitespace-nowrap flex flex-col h-[50%] items-center justify-center">
        <p>당신의 건강, <span className="text-blue-700">헬씨핏</span></p>
        <p className="mt-[2%] h-[5%]">지금, 헬씨핏에서 <span className="text-sky-500">식단을 기록</span>하세요</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <LinkButton url={"/login"} title={"시작하기"}/>
      </div>
    </div>
  )
}

export default GetStart