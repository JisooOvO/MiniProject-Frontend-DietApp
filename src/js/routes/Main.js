import LinkButton from "../loginAndSignup/LinkButton"
import "../../style/responsive.css"
import Pot from "../../images/Pot"
import Donut from "../../images/Donut"
import "../../style/animation.css"

const Main = () => {
  return (
    <div id="container" className="h-full bg-gradient-to-t from-cyan-300 to-slate-300 flex flex-col items-center justify-center">
      <div className="flex gap-4 w-40 h-30 sm:w-80 sm:h-40"><Pot/><Donut/></div>
      <div id="mainTitle"
        className="font-extralight drop-shadow-md text-[250%] items-center text-white whitespace-nowrap flex flex-col h-40 justify-center typing-text">
        <p>당신의 건강, <span className="text-[#E56A77]">헬씨핏</span></p>
        <p id="matinText2">지금, 헬씨핏에서
          <span className="text-[#FF917B]"> 식단을 기록</span>하세요</p>
      </div>
      <div className="flex flex-col mt-10 justify-center items-center w-[60rem]">
        <LinkButton url={"/login"} title={"시작하기"} />
      </div>
      
    </div>
  )
}

export default Main