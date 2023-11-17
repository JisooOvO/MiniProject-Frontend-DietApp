import IsLogin from "../common/IsLogin";
import leftarrow from "../../images/left_arrow.png";
import rightarrow from "../../images/right_arrow.png";
import { useNavigate, useParams } from "react-router-dom";
import { CalTomorrow, CalYesterday } from "../common/Calday"
import { useState } from "react";

const User = () => {  
  IsLogin();
  const [searchfood,setSearchFood] = useState();
  const navigate = useNavigate();
  const day = useParams().date;
  let arr;

  const handleLeftButton = () => {
    const yesterday = CalYesterday(day);
    navigate(`/user/${yesterday}`)
  }
  
  const handleRightButton = () => {
    const tomorrow = CalTomorrow(day);
    navigate(`/user/${tomorrow}`)
  }

  const handleCheckButton = (e) => {
    const foodNm = e.target.parentNode.parentNode.innerText;
    console.dir(foodNm.slice(0,foodNm.indexof("\\")));
  }

  const handleDetailButton = (e) => {

  }

  const handleSearch = (e) => {
    e.preventDefault();
    const search = document.querySelector("#searchfood").value;
    fetch("http://10.125.121.212:8080/getFoodList",{
      method : "POST",
      body : JSON.stringify({
        "foodname" : search
      })
    })
    .then(res => res.json())
    .then(data => {
      setSearchFood(data.map((item,idx) =>
      <div key={`key${idx}`} className="w-full h-[20%] p-1 border flex flex-col justify-center relative">
        <div className="text-[80%] w-[70%] text-ellipsis overflow-visible">{item["식품명"]}</div>
        <div className="flex text-sm">
            <div className="text-[80%]">{item["_1회제공량"]+"g"}</div>
            <div className="text-[80%]">&nbsp;{item["칼로리"]+"kcal"}</div>
        </div>
        <div className="flex absolute right-0 gap-2">
            <button onClick={handleCheckButton} className="hover:bg-[#707070] border w-7 h-7 text-green-500 bg-[#f1f1f1] rounded-[50%]">✔</button>
            <button onClick={handleDetailButton} className="hover:bg-[#707070] border w-7 h-7 bg-[#f1f1f1]  rounded-[50%]">🔍</button>
        </div>
      </div>
      ))
      arr = data;
      console.log(arr);
    })
    .then(e => console.log(e));
  }

  /** 자동완성 함수 */
  const handleSearchFood = (e) => {
    console.dir(e);
  } 

  return (
    <div className="flex flex-col m-auto justify-center items-center w-[95%] h-full">
      <div className="w-full text-3xl h-20 flex justify-center items-center">
        <img src={leftarrow} alt="leftarrow" onClick={handleLeftButton} className="h-full hover:cursor-pointer"/>
        <span>{day.slice(0,4)+"년 "+day.slice(4,6)+"월 "+day.slice(6,8)+"일"}</span>
        <img src={rightarrow} alt="rightarrow" onClick={handleRightButton} className="h-full hover:cursor-pointer"/>
      </div>
      <div className="flex w-full h-[40rem]">
        <div className="border rounded-lg w-[20%] p-2">
          <nav className="h-full">
            <div className="border-2 mb-2 w-full relative flex items-center">
              <input id="searchfood" type="text" name="food" 
              className="w-[90%]" onKeyDown={handleSearchFood} placeholder="음식을 검색하세요"/>
              <button onClick={handleSearch} className="hover:cursor-pointer">🔍</button>
            </div>
            <div className="border m-1 h-[45%] overflow-scroll overflow-x-hidden">
              {searchfood}
            </div>
          </nav>
        </div>
        <div className="border w-[80%] h-full">
          통계
        </div>
      </div>
    </div>
  )
}

export default User