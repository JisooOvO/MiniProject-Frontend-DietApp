import { Link } from "react-router-dom"
import "../style/main.css"

const GetStart = () => {
  return (
    <div id="container" className="h-full">
      <div className="mt-[20%] font-bold text-3xl text-white flex flex-col items-center justify-center">
        <p>당신의 하루, 헬씨핏</p>
        <p className="mt-[2%]">지금 헬씨핏에서 당신의 건강을 기록하세요</p>
      </div>
      <div className="flex flex-col justify-center items-center mt-[2%]">
        <Link to={"/login"} className="w-1/6 h-10 border-[1] bg-white rounded-lg flex flex-col justify-center items-center shadow-md">시작하기</Link>
      </div>
    </div>
  )
}

export default GetStart