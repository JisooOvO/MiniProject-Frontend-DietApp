import LinkButton from "../common/LinkButton"
import "../../style/responsive.css"

const Main = () => {
  return (
    
    <div id="container" className="h-full bg-gradient-to-t from-cyan-500 to-slate-300">
      <div id="mainTitle" className="font-extralight drop-shadow-md text-[250%] text-white whitespace-nowrap flex flex-col 
      mt-[10%] items-center justify-center">
        <p>당신의 건강, <span className="text-blue-600">헬씨핏</span></p>
        <p id="matinText2" className="mt-[2%] mb-[20rem] h-[5%]">지금, 헬씨핏에서 <span className="text-sky-500">식단을 기록</span>하세요</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <LinkButton url={"/login"} title={"시작하기"}/>
      </div>
    </div>
  )
}

export default Main