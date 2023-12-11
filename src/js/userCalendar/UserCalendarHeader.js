import leftarrow from "../../images/left_arrow.png";
import rightarrow from "../../images/right_arrow.png";

const UserCalendarHeader = ({currentYear,currentMonth,handleClickLeftArrow,handleClickRightArrow}) => {
  return (
    <div className="w-full text-2xl sm:text-3xl mb-4 h-20 flex justify-center items-center">
    <img src={leftarrow} alt="leftarrow" onClick={handleClickLeftArrow} className="h-1/2 sm:h-full hover:cursor-pointer drop-shadow-md" />
    <div className="text-[70%] w-[55%] max-w-[20rem] text-center sm:text-[100%] drop-shadow whitespace-nowrap relative">
      {currentYear}년 {String(currentMonth).padStart(2,"0")}월의 기록 📊
    </div>
    <img src={rightarrow} alt="rightarrow" onClick={handleClickRightArrow} className="h-1/2 sm:h-full hover:cursor-pointer drop-shadow-md" />
  </div>
  )
}

export default UserCalendarHeader