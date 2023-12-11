import { useEffect, useState } from "react"
import weightIcon from "../../images/body_weight_icon.png";
import calorieFoodIcon from "../../images/calories_food_nutrition_icon.png";
import { useNavigate } from "react-router-dom";
import { CalToday } from "../common/Calday";

const DayComponent = ({innerWidth,currentYear,currentMonth,isLastMonth,isNextMonth,d,targetCal,targetWeight}) => {
  const today = CalToday();
  let targetYear = currentYear;
  let targetMonth = currentMonth;
  let isToday = false;
  const [calorie, setCalorie] = useState(0);
  const [weight, setWeight] = useState(0);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  if(isLastMonth){
    targetMonth = currentMonth - 1;
    if(targetMonth < 1) {
        targetMonth = 12;
        targetYear = targetYear - 1;
    }
  }

  if(isNextMonth){
    targetMonth = currentMonth + 1;
    if(targetMonth > 12){
        targetMonth = 1;
        targetYear = targetYear + 1;
    }
  }

  const targetDate = targetYear+"-"+targetMonth+"-"+String(d).padStart(2,"0");
  if(today === targetDate) isToday = true;

  useEffect(()=>{
    fetch("http://healthyfit3-env.eba-hmvcyftc.ap-northeast-2.elasticbeanstalk.com/api/private/getMonthlyData",{
        method : "post",
        headers : {
            "Authorization" : token
        },
        body : JSON.stringify({
            "targetDate" : targetYear+"-"+targetMonth+"-"+d
        })
    })
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        const w = Math.max(...data.weights);
        setWeight(w);
        setCalorie(data["calorie"]);
    })
    .catch(e => {
        console.log(e);
    })
    // eslint-disable-next-line
  },[currentYear,currentMonth])

  const handleClick = (e) => {
    e.target.nextSibling.classList.toggle("hidden");
  }

  const handleClickAddDiet = (e) => {
    const d = e.target.previousSibling.innerText.padStart(2,"0");
    // console.log(`../user/${targetYear+"-"+targetMonth.padStart(2,"0")+"-"+d}/아침`)
   navigate(`../user/${targetYear+"-"+String(targetMonth).padStart(2,"0")+"-"+d}/아침`);
  }

  const handleClickIcon = (e) => {
    e.target.nextSibling.classList.toggle("hidden");
    e.target.nextSibling.classList.toggle("absolute");
    e.target.nextSibling.classList.toggle("top-9");
    e.target.nextSibling.classList.toggle("-right-4");
    e.target.nextSibling.classList.toggle("w-20");

  }

  useEffect(()=>{
    const response = document.querySelectorAll("#response");
    if(innerWidth > 636){
        response.forEach(item => item.classList.remove("hidden"));
    }else{
        response.forEach(item => item.classList.add("hidden"));
    }    
  })

  return (
    <td className="border-black border p-1 w-[14%] h-28 text-sm bg-[#EAEAEA]">
        <div className="flex items-center justify-between gap-2 h-10 mb-1 relative">
          { isToday ? 
          <div onClick={handleClick} id="day" className="w-7 h-7 border hover:cursor-pointer text-red-500 bg-white drop-shadow-md hover:bg-[#909090] rounded-[50%] flex justify-center items-center">{d}</div>
            :
           (isLastMonth || isNextMonth ) ?
           <div onClick={handleClick} id="day" className="w-7 h-7 border hover:cursor-pointer text-gray-400 bg-white drop-shadow-md hover:bg-[#909090] rounded-[50%] flex justify-center items-center">{d}</div>  
            :
          <div onClick={handleClick} id="day" className="w-7 h-7 border hover:cursor-pointer bg-white drop-shadow-md hover:bg-[#909090] rounded-[50%] flex justify-center items-center">{d}</div>
          }
          <div onClick={handleClickAddDiet} id="addDietButton" className="z-50  absolute top-9 border rounded-md w-24 text-center text-[80%] p-1 hidden shadow-md bg-white hover:cursor-pointer hover:bg-[#909090]">식단 등록하기</div>
        </div>
        <div className="sm:block flex justify-between">
            <div className="relative flex items-center sm:justify-end gap-1 h-8">
              { calorie > 0 ? 
              <>
              { innerWidth > 634 ?
                <div className="text-[80%] whitespace-nowrap drop-shadow-md">칼로리</div>
                :
                <img src={calorieFoodIcon} onClick={handleClickIcon} className="hover:cursor-pointer hover:bg-[#909090] bg-white shadow-md w-7 h-7 rounded-[50%] border flex items-center justify-center" alt="체중계 아이콘"/>
              }
              { +targetCal && +targetCal < calorie ?
                <div id="response" className="hidden text-[65%] text-red-500 border shadow-inner bg-white w-20 sm:w-[70%] whitespace-nowrap drop-shadow-sm text-end rounded-md p-1">{calorie.toFixed(0)+" kcal"}</div>
                :
                <div id="response" className="hidden text-[65%] border shadow-inner bg-white w-20 sm:w-[70%] whitespace-nowrap drop-shadow-sm text-end rounded-md p-1">{calorie.toFixed(0)+" kcal"}</div>
              }
              </> 
              : '' 
              }
            </div>
            <div className="relative flex items-center sm:justify-end gap-1 h-8">
              { weight > 0 ? 
              <>
              { innerWidth > 634?
                <div className="text-[80%] whitespace-nowrap drop-shadow-md">몸무게</div>
                :
                <img src={weightIcon} onClick={handleClickIcon} className="hover:cursor-pointer hover:bg-[#909090] bg-white shadow-md w-7 h-7 rounded-[50%] border flex items-center justify-center" alt="체중계 아이콘"/>
              }
              {
                +targetWeight !== 0 && +targetWeight < weight ?
                <div id="response" className="hidden text-[65%] text-red-500 border shadow-inner bg-white w-20 sm:w-[70%] whitespace-nowrap drop-shadow-sm text-end rounded-md p-1">{ weight.toFixed(1)+" kg"}</div>
                :
                <div id="response" className="hidden text-[65%] border shadow-inner bg-white w-20 sm:w-[70%] whitespace-nowrap drop-shadow-sm text-end rounded-md p-1">{ weight.toFixed(1)+" kg"}</div>
              }
              </>
              : '' 
              }
            </div>
        </div>
    </td>
  )
}

export default DayComponent