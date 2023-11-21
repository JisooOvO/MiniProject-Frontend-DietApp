import IsLogin from "../common/IsLogin";
import leftarrow from "../../images/left_arrow.png";
import rightarrow from "../../images/right_arrow.png";
import { useNavigate, useParams } from "react-router-dom";
import { CalToday, CalTomorrow, CalYesterday } from "../common/Calday"
import { useEffect, useState } from "react";
import Bar from "../common/Bar";
import ImgUpload from "../common/ImgUpload";
import "../../style/myhidden.css";
import Statistics from "../common/Statistics";
import CalBMR from "../common/CalBMR.js";

const User = () => {
  IsLogin();

  const [searchfood, setSearchFood] = useState();
  const [selectfood, setSelectFood] = useState([]);
  const [selectfoodView, setSelectFoodView] = useState();
  const navigate = useNavigate();
  const day = useParams().date;
  const slot = useParams().slot;
  const slotList = ["아침", "점심", "저녁", "간식"];
  const [selectSlotIndex, setSelectSlotIndex] = useState(slotList.indexOf(slot));
  const [selectSlot, setSelectSlot] = useState(slot);
  const [imageUrl, setImageUrl] = useState('');
  const token = localStorage.getItem("token");
  const [isClickSlotButton, setIsClickSlotButton] = useState(false);
  const [sumNutr, setSumwNutr] = useState('');
  const [showNutr, setShowwNutr] = useState('');
  let bmr;

  let arr;
  // const arr = [
  //   {
  //     "식품명": "감자",
  //     "_1회제공량": 100,
  //     "칼로리": 80,
  //     "탄수화물": 30,
  //     "단백질": 10,
  //     "지방": 50
  //   },
  //   {
  //     "식품명": "고구마",
  //     "_1회제공량": 200,
  //     "칼로리": 20,
  //     "탄수화물": 50,
  //     "단백질": 70,
  //     "지방": 90
  //   },
  //   {
  //     "식품명": "고르곤졸라피자고르곤졸라피자고르곤졸라피자",
  //     "_1회제공량": 600,
  //     "칼로리": 1200,
  //     "탄수화물": 120,
  //     "단백질": 70,
  //     "지방": 100
  //   },
  //   {
  //     "식품명": "제로콜라",
  //     "_1회제공량": 100,
  //     "칼로리": 400,
  //     "탄수화물": 250,
  //     "단백질": 72,
  //     "지방": 9
  //   }
  // ];

  /** 접속시 데이터 불러오기 */
  useEffect(() => {

    fetch("http://10.125.121.212:8080/getFoodList", {
      method: "post",
      headers: {
        "Authorization": token
      },
      body: JSON.stringify({
        "date": day,
        "slot": slot
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.diets);
      setSelectFood(data.diets)
      //BMR = CalBMR(/** 데이터 */)
    })
    .catch(e => console.log(e));

    // eslint-disable-next-line
  }, [])

  const handleDeleteButton = (e) => {
    const foodNm = e.target.parentNode.parentNode.innerText;
    const searchfoodNm = foodNm.slice(0, foodNm.indexOf("\n"))
    setSelectFood((prevItem => prevItem.filter((item) => item["식품명"] !== searchfoodNm)));
  }

  /** 날짜 이동 함수 */
  const handleLeftButton = () => {
    const yesterday = CalYesterday(day);
    navigate(`/user/${yesterday}/${slot}`)
  }

  /** 날짜 이동 함수 */
  const handleRightButton = () => {
    const tomorrow = CalTomorrow(day);
    navigate(`/user/${tomorrow}/${slot}`)
  }

  /** 음식 추가 버튼 */
  const handleCheckButton = (e) => {
    const foodNm = e.target.parentNode.parentNode.parentNode.innerText;
    const foodServeMn = foodNm.split("\n");
    let temp = JSON.parse(JSON.stringify(arr.filter((item) =>
      item["식품명"] === foodServeMn[0]
    )));

    temp[0]["섭취량"] = e.target.parentNode.parentNode.firstChild.firstChild.valueAsNumber

    let gram = +temp[0]["섭취량"];
    let oriGram = +temp[0]["_1회제공량"];


    Object.entries(temp[0]).forEach(([key, value]) => {
      if (key === "식품코드" || key === "식품명" || key === "섭취량" || key === "_1회제공량") {
        temp[0][key] = value;
      } else {
        temp[0][key] = String(+value * (gram / oriGram));
      }
    });

    setSelectFood((previtem) => [...previtem, ...temp]);
  }

  /** 추가된 음식 리스트와 그래프 */
  useEffect(() => {
    if(selectfood){

    loop1:
    for (let idx = 0; idx < selectfood.length; idx++) {
      const foodNm = selectfood[idx]["식품명"];
      for (let i = selectfood.length - 1; i > idx; i--) {
        const compareNm = selectfood[i]["식품명"];
        if (foodNm === compareNm) {
          selectfood.splice(idx, 1);
          break loop1;
        }
      }
    }


    setSelectFoodView(selectfood.map((item, idx) =>
      <div key={`key${idx}`} className="h-[80%] md:h-[35%] w-[95%] p-2 border m-2 rounded-md shadow-md">
        <div className="flex justify-between mb-1 h-[28%] w-[95%]">
          <div className="flex gap-2 border rounded-md w-[80%] mb-1 shadow-inner bg-[#EFEFEF] p-2 text-gray-700">
            <div className="flex items-center text-[80%]">{item["식품명"]}</div>
            <div className="flex items-center text-[80%]">
              <div>{item["섭취량"] + "g"}</div>
            </div>
          </div>
          <div className="flex items-center mb-1"><button onClick={handleDeleteButton} className="hover:bg-[#707070] border w-7 h-7 shadow-md bg-white rounded-[50%] flex justify-center items-center">❌</button></div>
        </div>
        <div className="h-[80%] w-[95%] flex flex-col justify-center border-t">
          <div className="h-[20%] flex justify-center items-center">
            <span className="text-[70%] whitespace-nowrap w-[20%]">칼로리</span>
            <Bar nutr={+item["칼로리"]} color={"#F7CD01"} isKcal={true} />
          </div>
          <div className="h-[20%] flex justify-center items-center">
            <span className="text-[70%] whitespace-nowrap w-[20%]">탄수화물</span>
            <Bar nutr={+item["탄수화물"]} color={"#88CB53"} />
          </div>
          <div className="h-[20%] flex justify-center items-center">
            <span className="text-[70%] whitespace-nowrap w-[20%]">단백질</span>
            <Bar nutr={+item["단백질"]} color={"#35abf4"} />
          </div>
          <div className="h-[20%] flex justify-center items-center">
            <span className="text-[70%] whitespace-nowrap w-[20%]">지방</span>
            <Bar nutr={+item["지방"]} color={"#F54545"} />
          </div>
        </div>
      </div>
    ));

    let totalKcal = 0;
    let totalWater = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbohydrate = 0;
    let totalSugars = 0;
    let totalFiber = 0;
    let totalCalcium = 0;
    let totalIron = 0;
    let totalMagnesium = 0;
    let totalPhosphorus = 0;
    let totalPotassium = 0;
    let totalSodium = 0;
    let totalZinc = 0;
    let totalCopper = 0;
    let totalManganese = 0;
    let totalB1 = 0;
    let totalB2 = 0;
    let totalB12 = 0;
    let totalC = 0;
    let totalCholesterol = 0;
    let totalSaturated = 0;
    let totalTrans = 0;

    selectfood.forEach(item => {
      totalKcal = totalKcal + +item["칼로리"];
      totalWater = totalWater + +item["수분"];
      totalProtein = totalProtein + +item["단백질"];
      totalFat = totalFat + +item["지방"];
      totalCarbohydrate = totalCarbohydrate + +item["탄수화물"];
      totalSugars = totalSugars + +item["당류"];
      totalFiber = totalFiber + +item["식이섬유"];
      totalCalcium = totalCalcium + +item["칼슘"];
      totalIron = totalIron + +item["철"];
      totalMagnesium = totalMagnesium + +item["마그네슘"];
      totalPhosphorus = totalPhosphorus + +item["인"];
      totalPotassium = totalPotassium + +item["칼륨"];
      totalSodium = totalSodium + +item["나트륨"];
      totalZinc = totalZinc + +item["아연"];
      totalCopper = totalCopper + +item["구리"];
      totalManganese = totalManganese + +item["망간"];
      totalB1 = totalB1 + +item["비타민B1"];
      totalB2 = totalB2 + +item["비타민B2"];
      totalB12 = totalB12 + +item["비타민B12"];
      totalC = totalC + +item["비타민C"];
      totalCholesterol = totalCholesterol + +item["콜레스테롤"];
      totalSaturated = totalSaturated + +item["포화지방산"];
      totalTrans = totalTrans + +item["트랜스지방산"];
    })

    setSumwNutr({
      "총 칼로리": totalKcal,
      "총 수분": totalWater,
      "총 단백질": totalProtein,
      "총 지방": totalFat,
      "총 탄수화물": totalCarbohydrate,
      "총 당류": totalSugars,
      "총 식이섬유": totalFiber,
      "총 칼슘": totalCalcium,
      "총 철분": totalIron,
      "총 마그네슘": totalMagnesium,
      "총 인": totalPhosphorus,
      "총 칼륨": totalPotassium,
      "총 나트륨": totalSodium,
      "총 아연": totalZinc,
      "총 구리": totalCopper,
      "총 망간": totalManganese,
      "총 비타민B1": totalB1,
      "총 비타민B2": totalB2,
      "총 비타민B12": totalB12,
      "총 비타민C": totalC,
      "총 콜레스테롤": totalCholesterol,
      "총 포화지방산": totalSaturated,
      "총 트랜스지방산": totalTrans
    });

  }}, [selectfood]);

  /** 유저 정보 전달 함수(미완) */
  const handleUserInfoSaveBt = () => {
    const height = document.querySelector("#height").valueAsNumber;
    const weight = document.querySelector("#weight").valueAsNumber;
    const gender = document.querySelector("#gender").value;
    const age = document.querySelector("#age").valueAsNumber;
    const activityFactor = document.querySelector("#activityFactor").value;
    bmr = CalBMR(height,weight,gender,age,activityFactor)
    console.log(bmr);
  }

  /** 통계 함수(미완) */
  useEffect(()=>{  
    if(sumNutr){
      setShowwNutr( 
        Object.entries(sumNutr).map(([key, value]) => console.log(key,value))
      );
    }
  },[sumNutr])


  /** 디테일 버튼(미완)*/
  const handleDetailButton = (e) => {

  }

  /** 검색 함수 */
  const handleSearch = (e) => {
    e.preventDefault();
    const search = document.querySelector("#searchfood").value;

    // setSearchFood(arr.map((item, idx) =>
    //   <div key={`key${idx}`} className="w-full h-[10%] xl:h-[10%] p-2 border bg-[#efefef] grid grid-cols-2 shadow-inner rounded-lg mb-1">
    //     <div className="flex flex-col justify-center border bg-white shadow-inner rounded-md p-2 h-full">
    //       <div id="foodName" className="w-[70%] text-ellipsis text-gray-700">{item["식품명"]}</div>
    //       <div className="flex text-sm text-gray-500">
    //         <div className="text-[90%]">{item["_1회제공량"] + "g"}</div>
    //         <div className="text-[90%]">&nbsp;{item["칼로리"] + "kcal"}</div>
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center justify-items-end h-full p-2">
    //       <div className="flex items-center">
    //         <input type="number" id="foodServeMn" defaultValue={item["_1회제공량"]} className="border max-w-[4rem] p-1 rounded-lg" /><span>g&nbsp;</span>
    //       </div>
    //       <div className="flex">
    //         <button onClick={handleCheckButton} className="hover:bg-[#707070] border w-7 h-7 mr-2 text-green-500 shadow-md bg-white rounded-[50%]">✔</button>
    //         <button onClick={handleDetailButton} className="hover:bg-[#707070] border w-7 h-7 bg-white shadow-md  rounded-[50%]">🔍</button>
    //       </div>
    //     </div>
    //   </div>
    // ));

    fetch("http://10.125.121.212:8080/searchFoodList",{
      method : "POST",
      body : JSON.stringify({
        "foodname" : search
      })
    })
    .then(res => res.json())
    .then(data => {
      arr = data;
      setSearchFood(arr.map((item,idx) =>
      <div key={`key${idx}`} className="w-full h-[10%] xl:h-[10%] p-2 border bg-[#efefef] grid grid-cols-2 shadow-inner rounded-lg mb-1">
        <div className="flex flex-col justify-center border h-[90%] bg-white rounded-md p-2">
          <div id="foodName" className="w-[70%] text-ellipsis drop-shadow text-[80%] md:text-[100%] text-gray-700">{item["식품명"]}</div>
          <div className="flex text-sm text-gray-500">
              <div className="text-[75%] md:text-[90%]">{item["_1회제공량"]+"g"}</div>
              <div className="text-[75%] md:text-[90%]">&nbsp;{item["칼로리"]+"kcal"}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center justify-items-end h-full p-2">
            <div className="flex items-center">
              <input type="number" id="foodServeMn" defaultValue={item["_1회제공량"]}
               className="border max-w-[4rem] shadow-inner p-1 rounded-lg"/><span>g&nbsp;</span>
            </div>
            <div className="flex">
              <button onClick={handleCheckButton} 
              className="hover:bg-[#707070] border w-7 h-7 mr-2 text-green-500 shadow-md bg-white rounded-[50%]">✔</button>
              <button onClick={handleDetailButton} 
              className="hover:bg-[#707070] border w-7 h-7 bg-white shadow-md  rounded-[50%]">🔍</button>
            </div>
        </div>
      </div>
     ));
    })
    .catch(e => {
      console.log(e);
      alert("데이터 조회 중 에러 발생");
    });
  }

  /** 자동완성 함수(미완) */
  const handleSearchFood = (e) => {
    console.dir(e);
  }

  /** 저장 함수 */
  const handleSaveButton = () => {
    fetch("http://10.125.121.212:8080/addFood", {
      method: "POST",
      headers: {
        "Authorization": token
      },
      body: JSON.stringify({
        "date": day,
        "slot": slot,
        "dietList": selectfood,
        "img": imageUrl
      })
    })
      .then(res => {
        if (res.status === 200) {
          alert("저장되었습니다.");
          window.location.reload();
        }
      })
      .catch(e => {
        console.log(e);
        alert("데이터 저장 중 오류 발생");
      });

  }

  /** 초기화 함수 */
  const handleCancelButton = () => {
    const preview = document.getElementById("preview");
    const img = document.getElementById("img");
    const input = document.getElementById('image');
    input.value = ''
    setImageUrl("");
    img.classList.add('myhidden');
    preview.classList.remove("hidden");
    if(selectfood) setSelectFood("");
  }

  const today = CalToday();

  /** 시간대 이동 함수 */
  const handleSlotLeftButton = () => {
    setSelectSlotIndex(i => i + 3);
    setIsClickSlotButton(true);
  }

  /** 시간대 이동 함수 */
  const handleSlotRightButton = () => {
    setSelectSlotIndex(i => i + 1);
    setIsClickSlotButton(true);
  }

  useEffect(() => {
    setSelectSlot(slotList[selectSlotIndex % 4]);
    // eslint-disable-next-line
  }, [selectSlotIndex]);

  useEffect(() => {
    if (isClickSlotButton) navigate(`/user/${today}/${selectSlot}`);
    setIsClickSlotButton(false);
  }, [selectSlot])


  /** 화면 사이즈에따른 음식 검색 창 반응형 디자인 */
  const toggleContainer = document.querySelector("#toggleContainer");
  const hiddenBt = document.querySelector("#hiddenBt");

  const handleResize = () => {
    let width = window.innerWidth;
    if (width < 1277) {
      if (toggleContainer) toggleContainer.classList.add("hidden");
      if (hiddenBt) hiddenBt.classList.remove("hidden");
    } else {
      if (toggleContainer) toggleContainer.classList.remove("hidden");
      if (hiddenBt) hiddenBt.classList.add("hidden");
    }
  }

  window.addEventListener('resize', () => {
    handleResize();
  });

  window.addEventListener('load', () => {
    handleResize();
  })

  const handleToggleContainer = () => {
    toggleContainer.classList.toggle("hidden");
  }

  return (
    <div className="flex flex-col m-auto items-center w-[95%] h-[70rem] ">
      <div className="w-full text-2xl sm:text-3xl h-20 flex justify-center items-center">
        <img src={leftarrow} alt="leftarrow" onClick={handleLeftButton} className="h-1/2 sm:h-full hover:cursor-pointer drop-shadow-md" />
        <span className="text-[70%] sm:text-[100%] drop-shadow">{day.slice(0, 4) + "년 " + day.slice(4, 6) + "월 " + day.slice(6, 8) + "일"}</span>
        <img src={rightarrow} alt="rightarrow" onClick={handleRightButton} className="h-1/2 sm:h-full hover:cursor-pointer drop-shadow-md" />
      </div>
      <div className="flex gap-1 justify-between w-full">
        <button id="hiddenBt" onClick={handleToggleContainer} 
        className="border hidden rounded-lg whitespace-nowrap text-[60%] 
        sm:text-[100%] shadow-lg w-48 h-8 mb-2 
        bg-[#14A8DD] hover:bg-[#3A84F5] text-white">음식 검색하기 🔻</button>
        <div className="flex gap-1 justify-end w-full">
          <button onClick={handleCancelButton} className="border rounded-lg shadow-lg w-24 h-8 mb-2 text-[60%] sm:text-[100%]  bg-[#14A8DD] hover:bg-[#3A84F5] text-white">초기화</button>
          <button onClick={handleSaveButton} className="border rounded-lg shadow-lg w-24 h-8 mb-2 text-[60%] sm:text-[100%]  bg-[#14A8DD] hover:bg-[#3A84F5] text-white">저장하기</button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-2 w-full h-[65rem]">
        <div id="toggleContainer" className="border rounded-lg p-2 shadow-lg bg-[#EAEAEA] h-full">
          <nav className="h-[65rem] overflow-hidden">
            <div className="mb-2 w-full relative flex items-center gap-2">
              <input id="searchfood" type="text" name="food"
                className="w-[98%] p-2 shadow-inner rounded-lg border-b-2" onKeyDown={handleSearchFood} placeholder="음식을 검색하세요" />
              <button onClick={handleSearch} className="hover:cursor-pointer p-1 w-7 h-7 hover:bg-[#707070] shadow-md bg-white  rounded-[50%] border flex flex-col justify-center items-center">🔍</button>
            </div>
            <div className="border m-1 lg:h-[95%] h-[85%] overflow-scroll overflow-x-hidden bg-white rounded-xl shadow-inner p-2">
              {searchfood}
            </div>
          </nav>
        </div>
        <div className="border h-[65rem] rounded-lg shadow-lg bg-[#EAEAEA] overflow-scroll overflow-x-hidden">
          <div className="h-10 flex justify-between items-center border rounded-lg bg-white shadow-inner m-2">
            <img src={leftarrow} alt="leftarrow" onClick={handleSlotLeftButton} className="h-full hover:cursor-pointer drop-shadow-md" />
            <div>{selectSlot}</div>
            <img src={rightarrow} alt="rightarrow" onClick={handleSlotRightButton} className="h-full hover:cursor-pointer drop-shadow-md" />
          </div>
          <div className="grid grid-cols-1 grid-rows-2 gap-1 md:grid-cols-2 p-4 w-full h-full">
            <div>
              <ImgUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
            </div>
            <div className="border row-start-2 md:row-start-1 overflow-scroll w-full overflow-x-hidden bg-white rounded-lg shadow-inner">
              <div className="my-5 w-[90%] mx-auto h-10 border rounded-lg shadow-inner drop-shadow flex justify-center items-center">식단</div>
              {selectfoodView}
            </div>
            <div className="border col-span-2 bg-white shadow-inner rounded-lg">
              <div className="my-5 w-[90%] mx-auto h-10 border rounded-lg shadow-inner flex justify-center drop-shadow items-center">식단 분석 🕵️‍♂️</div>
                <Statistics 
                height={/** 데이터 받을 자리 */170}
                weight={/** 데이터 받을 자리*/70}
                age={/** 데이터 받을 자리*/27}
                gender={/** 데이터 받을 자리*/1}
                activityFactor={/** 데이터 받을 자리*/1}
                func={handleUserInfoSaveBt}
                />
                <div className="sm:mt-10 border h-[5rem]">
                  {showNutr}
                </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User