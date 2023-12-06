import { useNavigate } from "react-router-dom";
import leftarrow from "../../images/left_arrow.png";
import rightarrow from "../../images/right_arrow.png";
import { CalTomorrow, CalYesterday } from "../common/Calday";

const UserHeader = ({day,slot}) => {
  const navigate = useNavigate();
  
  /** 날짜 이동 함수 */
  const handleLeftButton = () => {
    const yesterday = CalYesterday(day.replaceAll("-", ""));
    navigate(`/user/${yesterday}/${slot}`)
  }
    
  /** 날짜 이동 함수 */
  const handleRightButton = () => {
    const tomorrow = CalTomorrow(day.replaceAll("-", ""));
    navigate(`/user/${tomorrow}/${slot}`);
  }

  /** 달력 날짜 이동 함수 */
  const handleChangeDate = (e) => {
    const targetDate = e.target.value
    navigate(`/user/${targetDate}/${slot}`)
  }

  return (
    <div className="w-full text-2xl sm:text-3xl mt-2 h-20 flex justify-center items-center">
    <img src={leftarrow} alt="leftarrow" onClick={handleLeftButton} className="h-1/2 sm:h-full hover:cursor-pointer drop-shadow-md" />
    <div className="text-[80%] w-[55%] max-w-[20rem] text-center sm:text-[100%] drop-shadow whitespace-nowrap relative">
      {day.slice(0, 4) + "년 " + day.slice(5, 7) + "월 " + day.slice(8, 10) + "일"}
      <input type="date" onChange={handleChangeDate} id="date1" name="date1" className="w-full absolute top-0 left-0 opacity-0" defaultValue={day} />
    </div>
    <img src={rightarrow} alt="rightarrow" onClick={handleRightButton} className="h-1/2 sm:h-full hover:cursor-pointer drop-shadow-md" />
  </div>
  )
}

export default UserHeader