import { useEffect, useState } from "react";
import Calendar from "../userCalendar/Calendar.js"
import UserCalendarHeader from "../userCalendar/UserCalendarHeader.js"
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading.js";
import ComboBarAndLineChart from "../userCalendar/ComboBarAndLineChart.js";
import { CalToday } from "../common/Calday.js";

const UserCalendar = () => {
  const [currentYear,setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth,setCurrentMonth] = useState(new Date().getMonth() + 1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const today = CalToday();
  const [calories,setCalories] = useState([]);
  const [dates,setDates] = useState([]);
  const [weights,setWeights] = useState([]);
  const [showChart, setShowChart] = useState('');
  const handleClickLeftArrow = () => {
    setCurrentMonth(currentMonth - 1);
  }
  const handleClickRightArrow = () => {
    setCurrentMonth(currentMonth + 1);
  }

  useEffect(()=>{
    if(!token){
      alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }

    setIsLoading(true);
    fetch("http://10.125.121.212:8080/api/private/getMonthlyCaloriesAndWeights",{
      method : "post",
      headers : {
        "Authorization" : token,
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        "today" : today
      })
    })
    .then(res => res.json())
    .then(data => {
      setIsLoading(false);
      console.log(data)
      setCalories(data["calories"]);
      setDates(data["dates"]);
      setWeights(data["weights"]);
    })
    .catch(e => console.log(e));
    // eslint-disable-next-line
  },[currentMonth])

  useEffect(()=>{
    setShowChart(<ComboBarAndLineChart dates={dates} calories={calories} weights={weights}/>)
  },[calories,dates,weights])

  useEffect(()=>{
    if(currentMonth > 12){
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
    }
    if(currentMonth < 1){
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
    }
    // eslint-disable-next-line
  },[currentMonth])

  return (
    <div id="CalendarContainer" className="flex flex-col mx-auto items-center w-[95%] h-full relative">
        { isLoading ? <div className="absolute w-screen h-full z-[9999] opacity-70 bg-gray-500 "><Loading/></div> : '' }
        <UserCalendarHeader currentYear={currentYear} currentMonth={currentMonth} handleClickLeftArrow={handleClickLeftArrow} handleClickRightArrow={handleClickRightArrow}/>
        <Calendar isLoading={isLoading} setIsLoading={setIsLoading} currentYear={currentYear} currentMonth={currentMonth}/>
        {showChart}
    </div>
  )
}

export default UserCalendar