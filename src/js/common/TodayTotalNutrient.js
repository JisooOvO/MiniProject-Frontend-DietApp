import { useState } from "react";
import TotalNutrientBar from "./TotalNutrientBar";

const TodayTotalNutrient = ({day,data,bmr,userInfo}) => {
  const [{ x, y }, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseDown = (m) => {
    const mouseMoveHandler = (e) => {
      const deltaX = e.screenX - m.screenX;
      const deltaY = e.screenY - m.screenY;

      setPosition({
          x: x + deltaX,
          y: y + deltaY,
      });
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, { once: true });
  }

  let morning;
  let lunch;
  let dinner;

  if(Array.isArray(data)) {
    data = JSON.parse(JSON.stringify(data));

    morning = data.filter(item => item["datehistory"]["slot"] === "아침" )[0];
    lunch = data.filter(item => item["datehistory"]["slot"] === "점심" )[0];
    dinner = data.filter(item => item["datehistory"]["slot"] === "저녁" )[0]; 

    console.log(morning,lunch,dinner);

    if(morning !== undefined) {
        delete morning.datehistory;
        delete morning.nutrient_id;
    } 

    if(lunch !== undefined) {
        delete lunch.datehistory;
        delete lunch.nutrient_id;
    } 

    if(dinner !== undefined) {
        delete dinner.datehistory;
        delete dinner.nutrient_id;
    } 
  }  

  const handleExit = () => {
    const todayTotalNutrientContainer = document.querySelector("#todayTotalNutrientContainer");
    todayTotalNutrientContainer.classList.add("hidden");
  }

  return (
    <div onMouseDown={handleMouseDown} 
    style={{ transform: `translateX(${x}px) translateY(${y}px)`}} 
    className="absolute lg:top-[10rem] top-48 left-[2rem] lg:left-[30rem] z-50 rounded-lg shadow-lg p-3
    border w-[20rem] h-[35rem] sm:h-[45rem] sm:w-[35rem] bg-[#14A8DD]">
        <div className="h-[10%] w-[80%] bg-white rounded-lg mb-4 flex items-center justify-between px-3 shadow-inner drop-shadow-md">
            <p className="text-sm sm:text-base drop-shadow-md">{day.replace("-","년 ").replace("-","월 ")+" 일의 식단 분석"}</p>
        </div>
        <button onClick={handleExit} className="border absolute top-4 right-4 w-7 h-7 rounded-[50%] bg-white hover:bg-[#707070] shadow-md">❌</button>
        <div className="h-[86%] overflow-scroll overflow-x-hidden rounded-lg">
            { data ?
            <div className="h-full">
                <TotalNutrientBar title={"칼로리"} recommendData={bmr} userDataMorning={morning ? morning["totalKcal"] : 0 } userDataLunch={lunch ? lunch["totalKcal"] : 0} userDataDinner={dinner ? dinner["totalKcal"] : 0} unit={"kcal"}/> 
                <TotalNutrientBar title={"물"} recommendData={2000} userDataMorning={morning ? morning["totalWater"] : 0} userDataLunch={lunch ? lunch["totalWater"] : 0} userDataDinner={dinner ? dinner["totalWater"] : 0} unit={"mL"}/> 
                <TotalNutrientBar title={"탄수화물"} recommendData={bmr/(2*4)} userDataMorning={morning ? morning["totalCarbohydrate"] : 0} userDataLunch={lunch ? lunch["totalCarbohydrate"] : 0} userDataDinner={dinner ? dinner["totalCarbohydrate"] : 0} unit={"g"}/> 
                <TotalNutrientBar title={"단백질"} recommendData={userInfo["weight"] ? userInfo["weight"] * 1.2 : bmr / (4*4)} userDataMorning={morning ? morning["totalProtein"] : 0} userDataLunch={lunch ? lunch["totalProtein"] : 0} userDataDinner={dinner ? dinner["totalProtein"] : 0} unit={"g"}/> 
                <TotalNutrientBar title={"지방"} recommendData={bmr/(5*9)} userDataMorning={morning ? morning["totalFat"] : 0} userDataLunch={lunch ? lunch["totalFat"] : 0} userDataDinner={dinner ? dinner["totalFat"] : 0} unit={"g"}/> 
                <TotalNutrientBar title={"당류"} recommendData={userInfo["gender"] === "1" ? 36 : 24 } userDataMorning={morning ? morning["totalSugars"] : 0} userDataLunch={lunch ? lunch["totalSugars"] : 0} userDataDinner={dinner ? dinner["totalSugars"] : 0} unit={"g"}/> 
                <TotalNutrientBar title={"식이섬유"} recommendData={userInfo["gender"] === "1" ? 25 : 20 } userDataMorning={morning ? morning["totalFiber"] : 0} userDataLunch={lunch ? lunch["totalFiber"] : 0} userDataDinner={dinner ? dinner["totalFiber"] : 0} unit={"g"}/> 
                <TotalNutrientBar title={"나트륨"} recommendData={2000} userDataMorning={morning ? morning["totalSodium"] : 0} userDataLunch={lunch ? lunch["totalSodium"] : 0} userDataDinner={dinner ? dinner["totalSodium"] : 0} unit={"mg"}/>
                <TotalNutrientBar title={"트랜스지방"} recommendData={2.2} userDataMorning={morning ? morning["totalTransFat"] : 0} userDataLunch={lunch ? lunch["totalTransFat"] : 0} userDataDinner={dinner ? dinner["totalTransFat"] : 0} unit={"mg"}/>
                <TotalNutrientBar title={"포화지방"} recommendData={15} userDataMorning={morning ? morning["totalSaturatedFat"] : 0} userDataLunch={lunch ? lunch["totalSaturatedFat"] : 0} userDataDinner={dinner ? dinner["totalSaturatedFat"] : 0} unit={"mg"}/>
                <TotalNutrientBar title={"콜레스테롤"} recommendData={300} userDataMorning={morning ? morning["totalCholesterol"] : 0} userDataLunch={lunch ? lunch["totalCholesterol"] : 0} userDataDinner={dinner ? dinner["totalCholesterol"] : 0} unit={"mg"}/>
                <TotalNutrientBar title={"칼슘"} recommendData={1200} userDataMorning={morning ? morning["totalCalcium"] : 0} userDataLunch={lunch ? lunch["totalCalcium"] : 0} userDataDinner={dinner ? dinner["totalCalcium"] : 0} unit={"mg"}/>
                <TotalNutrientBar title={"마그네슘"} recommendData={userInfo["gender"] === "1" ? 350 : 280} userDataMorning={morning ? morning["totalMagnesium"] : 0} userDataLunch={lunch ? lunch["totalMagnesium"] : 0} userDataDinner={dinner ? dinner["totalMagnesium"] : 0} unit={"mg"}/>
                <TotalNutrientBar title={"비타민B1"} recommendData={userInfo["gender"] === "1" ? 1.2 : 1.1} userDataMorning={morning ? morning["totalVitaB1"] : 0} userDataLunch={lunch ? lunch["totalVitaB1"] : 0} userDataDinner={dinner ? dinner["totalVitaB1"] : 0} unit={"mg"}/>
                <TotalNutrientBar title={"비타민B2"} recommendData={userInfo["gender"] === "1" ? 1.5 : 1.2} userDataMorning={morning ? morning["totalVitaB2"] : 0} userDataLunch={lunch ? lunch["totalVitaB2"] : 0} userDataDinner={dinner ? dinner["totalVitaB2"] : 0} unit={"mg"}/>
                <TotalNutrientBar title={"비타민B12"} recommendData={2.4} userDataMorning={morning ? morning["totalVitaB12"] : 0} userDataLunch={lunch ? lunch["totalVitaB12"] : 0} userDataDinner={dinner ? dinner["totalVitaB12"] : 0} unit={"µg"}/>
                <TotalNutrientBar title={"비타민C"} recommendData={200} userDataMorning={morning ? morning["totalVitaC"] : 0} userDataLunch={lunch ? lunch["totalVitaC"] : 0} userDataDinner={dinner ? dinner["totalVitaC"] : 0} unit={"mg"}/>
            </div>
            : '' }
        </div>
    </div>
  )
}

export default TodayTotalNutrient