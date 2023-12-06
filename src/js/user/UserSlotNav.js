import leftarrow from "../../images/left_arrow.png";
import rightarrow from "../../images/right_arrow.png";

const UserSlotNav = ({setSelectSlotIndex,setIsClickSlotButton,selectSlot}) => {
  /** 시간대 이동 함수 */
  const handleSlotLeftButton = () => {
    setSelectSlotIndex(i => i + 2);
    setIsClickSlotButton(true);
  }

  /** 시간대 이동 함수 */
  const handleSlotRightButton = () => {
    setSelectSlotIndex(i => i + 1);
    setIsClickSlotButton(true);
  }
  
  return (
    <div className="h-10 flex justify-between items-center border rounded-lg bg-white shadow-inner m-2">
        <img src={leftarrow} alt="leftarrow" onClick={handleSlotLeftButton} className="h-full hover:cursor-pointer drop-shadow-md" />
        <div>{selectSlot}</div>
        <img src={rightarrow} alt="rightarrow" onClick={handleSlotRightButton} className="h-full hover:cursor-pointer drop-shadow-md" />
    </div>
  )
}

export default UserSlotNav