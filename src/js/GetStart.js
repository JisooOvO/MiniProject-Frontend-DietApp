import "../style/main.css"
import LinkButton from "./common/LinkButton"

const GetStart = () => {
  return (
    <div id="container" className="h-full">
      <div className="font-extralight drop-shadow-md text-[250%] text-[#06B6D4] whitespace-nowrap flex flex-col h-[50%] items-center justify-center">
        <p>당신의 건강, 헬씨핏</p>
        <p className="mt-[2%] h-[10%]">지금, 헬씨핏에서 식단을 기록하세요</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <LinkButton url={"/login"} title={"시작하기"}/>
      </div>
    </div>
  )
}

export default GetStart