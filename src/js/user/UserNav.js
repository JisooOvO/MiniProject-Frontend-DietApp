import { BACKENDURL } from "../common/BACKEND";
import TodayTotalNutrient from "./totalNutrient/TodayTotalNutrient";

const UserNav = ({setIsLoading,token,day,setTodayTotalNutrientInfo,bmr,userInfo,slot,selectfood,imageUrl,sumNutr,handleCancelButton}) => {
  
  /** 검색 창 토글 기능 */
  const handleToggleContainer = () => {
    const toggleContainer = document.querySelector("#toggleContainer");
    toggleContainer.classList.toggle("hidden");
  }

  /** 오늘 통계 보여주는 함수 */
  const handleTotalStaticButton = () => {
    const todayTotalNutrientContainer = document.querySelector("#todayTotalNutrientContainer");
    todayTotalNutrientContainer.classList.remove("hidden");
    setIsLoading(true);
    fetch(BACKENDURL+"/api/private/getTodayTotalNutrient",{
        method : "post",
        headers : {
        "Authorization" : token,
        "Content-Type" : "application/json"
        },
        body : JSON.stringify({
        "date" : day
        })
    })
    .then(res => res.json())
    .then(data => {
        setIsLoading(false)
        setTodayTotalNutrientInfo(<TodayTotalNutrient day={day} data={data} bmr={bmr} userInfo={userInfo}/>);
    })
    .catch(e => {
        console.log(e);
        alert("데이터 수신 중 에러 발생");
    });
  }

  /** 저장 함수 */
  const handleSaveButton = () => {
    const weight = document.querySelector("#weight").valueAsNumber;
    fetch(BACKENDURL+"/api/private/addFoodList", {
        method: "post",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "date": day,
            "slot": slot,
            "dietList": selectfood,
            "img": imageUrl,
            "nutrient" : sumNutr,
            "weight" : weight
        })
    })
    .then(res => {
        if (res.status === 200) {
            alert("저장되었습니다.");
            window.location.reload();
        } else {
            alert("데이터 수신 중 오류 발생")
        }
    })
    .catch(e => {
        console.log(e);
        alert("데이터 저장 중 오류 발생");
    })
  }

  return (
    <div className="flex gap-1 justify-between w-full">
        <button id="hiddenBt" onClick={handleToggleContainer} className="border hidden rounded-lg whitespace-nowrap text-[60%] sm:text-[100%] shadow-lg w-32 sm:w-48 h-8 mb-2 bg-[#14A8DD] hover:bg-[#3A84F5] text-white">음식 검색하기 ▼</button>
        <div className="flex gap-1 justify-end w-full">
            <button onClick={handleTotalStaticButton} className="border rounded-lg shadow-lg max-w-[8rem] grow sm:w-44 h-8 mb-2 text-[60%] sm:text-[100%] whitespace-nowrap bg-[#14A8DD] hover:bg-[#3A84F5] text-white">오늘의 기록</button>
            <button onClick={handleCancelButton} className="border rounded-lg shadow-lg w-16 sm:w-24 h-8 mb-2 text-[60%] sm:text-[100%]  bg-[#14A8DD] hover:bg-[#3A84F5] text-white">초기화</button>
            <button onClick={handleSaveButton} className="border rounded-lg shadow-lg w-16 sm:w-24 h-8 mb-2 text-[60%] sm:text-[100%]  bg-[#14A8DD] hover:bg-[#3A84F5] text-white">저장하기</button>
        </div>
    </div>
  )
}

export default UserNav