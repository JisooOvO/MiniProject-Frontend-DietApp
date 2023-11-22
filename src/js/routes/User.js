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
import HorizontalBarChart from "../common/HorizontalBarChart.js";
import CursorInfo from "../common/CursorInfo.js";
import FoodDetailInfo from "../common/FoodDetailInfo.js";

const User = () => {
  IsLogin();

  const [searchfood, setSearchFood] = useState();
  const [selectfood, setSelectFood] = useState([]);
  const [selectfoodView, setSelectFoodView] = useState();
  const navigate = useNavigate();
  const day = useParams().date;
  const slot = useParams().slot;
  const slotList = ["아침", "점심", "저녁"]; 
  const [selectSlotIndex, setSelectSlotIndex] = useState(slotList.indexOf(slot));
  const [selectSlot, setSelectSlot] = useState(slot);
  const [imageUrl, setImageUrl] = useState('');
  const token = localStorage.getItem("token");
  const [isClickSlotButton, setIsClickSlotButton] = useState(false);
  const [sumNutr, setSumwNutr] = useState('');
  const [showNutr, setShowwNutr] = useState('');
  const [bmr,setBmr] = useState(0);
  const [userInfo, setUserInfo] = useState('');
  const [cursorInfo, setCursorInfo] = useState('');
  const [foodDetailInfo, setFoodDetailInfo] = useState('');

  //let arr;
  const arr = [
    {
      "food_name": "감자",
      "serving_size": 100,
      "kcal": 80,
      "carbohydrate": 30,
      "protein": 10,
      "fat": 50
    },
    {
      "food_name": "고구마",
      "serving_size": 200,
      "kcal": 20,
      "carbohydrate": 50,
      "protein": 70,
      "fat": 90
    },
    {
      "food_name": "고르곤졸라피자",
      "serving_size": 600,
      "kcal": 1200,
      "carbohydrate": 120,
      "protein": 70,
      "fat": 100
    },
    {
      "food_name": "제로콜라",
      "serving_size": 100,
      "kcal": 400,
      "carbohydrate": 250,
      "protein": 72,
      "fat": 9
    }
  ];
  
  /** 접속시 데이터 불러오기 */
  useEffect(() => {
    // fetch("http://10.125.121.212:8080/getFoodList", {
    //   method: "post",
    //   headers: {
    //     "Authorization": token
    //   },
    //   body: JSON.stringify({
    //     "date": day,
    //     "slot": slot
    //   })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     setSelectFood(data.history.diets);
    //     setImageUrl(data.history.img);
    //     setUserInfo(data.HI);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     alert("데이터 수신 중 에러 발생");
    //   });

    // eslint-disable-next-line
  }, [])

  /** 삭제 함수 */
  const handleDeleteButton = (e) => {
    const foodNm = e.target.parentNode.parentNode.innerText;
    const searchfoodNm = foodNm.slice(0, foodNm.indexOf("\n"));
    setSelectFood((prevItem => prevItem.filter((item) => item["food_name"] !== searchfoodNm)));
  }

  /** 날짜 이동 함수 */
  const handleLeftButton = () => {
    const yesterday = CalYesterday(day.replaceAll("-",""));
    navigate(`/user/${yesterday}/${slot}`)
  }

  /** 날짜 이동 함수 */
  const handleRightButton = () => {
    const tomorrow = CalTomorrow(day.replaceAll("-",""));
    navigate(`/user/${tomorrow}/${slot}`)
  }

  /** 음식 추가 버튼 */
  const handleCheckButton = (e) => {
    const foodNm = e.target.parentNode.parentNode.parentNode.innerText;
    const foodServeMn = foodNm.split("\n");
    let temp = JSON.parse(JSON.stringify(arr.filter((item) =>
      item["food_name"] === foodServeMn[0]
    )));

    temp[0]["intake_size"] = e.target.parentNode.parentNode.firstChild.firstChild.valueAsNumber

    let gram = +temp[0]["intake_size"];
    let oriGram = +temp[0]["serving_size"];


    Object.entries(temp[0]).forEach(([key, value]) => {
      if (key === "food_name" || key === "intake_size" || key === "serving_size") {
        temp[0][key] = value;
      } else {
        temp[0][key] = String((+value * (gram / oriGram)).toFixed(2));
      }
    });

    setSelectFood((previtem) => [...previtem, ...temp]);
  }

  /** 추가된 음식 리스트 */
  useEffect(() => {
    if (selectfood) {

      loop1:
      for (let idx = 0; idx < selectfood.length; idx++) {
        const foodNm = selectfood[idx]["food_name"];
        for (let i = selectfood.length - 1; i > idx; i--) {
          const compareNm = selectfood[i]["food_name"];
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
              <div className="flex items-center text-[80%]">{item["food_name"]}</div>
              <div className="flex items-center text-[80%]">
                <div>{item["intake_size"] + "g"}</div>
              </div>
            </div>
            <div className="flex items-center mb-1"><button onClick={handleDeleteButton} className="hover:bg-[#707070] border w-7 h-7 shadow-md bg-white rounded-[50%] flex justify-center items-center">❌</button></div>
          </div>
          <div className="h-[80%] w-[95%] flex flex-col justify-center border-t">
            <div className="h-[20%] flex justify-center items-center">
              <span className="text-[70%] whitespace-nowrap w-[20%]">칼로리</span>
              <Bar nutr={+item["kcal"]} color={"#F7CD01"} isKcal={true} />
            </div>
            <div className="h-[20%] flex justify-center items-center">
              <span className="text-[70%] whitespace-nowrap w-[20%]">탄수화물</span>
              <Bar nutr={+item["carbohydrate"]} color={"#88CB53"} />
            </div>
            <div className="h-[20%] flex justify-center items-center">
              <span className="text-[70%] whitespace-nowrap w-[20%]">단백질</span>
              <Bar nutr={+item["protein"]} color={"#35abf4"} />
            </div>
            <div className="h-[20%] flex justify-center items-center">
              <span className="text-[70%] whitespace-nowrap w-[20%]">지방</span>
              <Bar nutr={+item["fat"]} color={"#F54545"} />
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
      let totalMagnesium = 0;
      let totalSodium = 0;
      let totalB1 = 0;
      let totalB2 = 0;
      let totalB12 = 0;
      let totalC = 0;
      let totalCholesterol = 0;
      let totalSaturated = 0;
      let totalTrans = 0;

      selectfood.forEach(item => {
        console.log(item);
        totalKcal = totalKcal + +item["kcal"];
        totalWater = totalWater + +item["water"];
        totalProtein = totalProtein + +item["protein"];
        totalFat = totalFat + +item["fat"];
        totalCarbohydrate = totalCarbohydrate + +item["carbohydrate"];
        totalSugars = totalSugars + +item["sugars"];
        totalFiber = totalFiber + +item["fiber"];
        totalCalcium = totalCalcium + +item["calcium"];
        totalMagnesium = totalMagnesium + +item["magnesium"];
        totalSodium = totalSodium + +item["sodium"];
        totalB1 = totalB1 + +item["vita_b1"];
        totalB2 = totalB2 + +item["vita_b2"];
        totalB12 = totalB12 + +item["vita_b12"];
        totalC = totalC + +item["vita_c"];
        totalCholesterol = totalCholesterol + +item["cholesterol"];
        totalSaturated = totalSaturated + +item["saturated_fat"];
        totalTrans = totalTrans + +item["trans_fat"];
      })

      setSumwNutr({
        "총 kcal": totalKcal,
        "총 water": totalWater,
        "총 protein": totalProtein,
        "총 fat": totalFat,
        "총 carbohydrate": totalCarbohydrate,
        "총 sugars": totalSugars,
        "총 fiber": totalFiber,
        "총 calcium": totalCalcium,
        "총 magnesium": totalMagnesium,
        "총 sodium": totalSodium,
        "총 vita_b1": totalB1,
        "총 vita_b2": totalB2,
        "총 vita_b12": totalB12,
        "총 vita_c": totalC,
        "총 cholesterol": totalCholesterol,
        "총 saturated_fat": totalSaturated,
        "총 trans_fat": totalTrans
      });

    }
  }, [selectfood]);

  /** 유저 정보 전달 함수(미완) */
  const handleUserInfoSaveBt = () => {
    const height = document.querySelector("#height").valueAsNumber;
    const weight = document.querySelector("#weight").valueAsNumber;
    const gender = document.querySelector("#gender").value;
    const age = document.querySelector("#age").valueAsNumber;
    const activityFactor = document.querySelector("#activityFactor").value;

    setBmr(CalBMR(height, weight, gender, age, activityFactor));

    fetch("http://10.125.121.212:8080/health/add",{
      method : "post",
      headers : {
        "Content-Type" :"application/json",
        "Authorization" : token
      },
      body : JSON.stringify({
        "height" : height,
        "weight" : weight,
        "gender" : gender,
        "age" : age,
        "activityFactor" : activityFactor
      })
    })
    .then(res => console.log(res))
    .catch(e => {
      console.log(e);
      alert("유저 정보 저장 중 에러 발생");
    });
  }

  /** 통계 함수(미완) */
  useEffect(() => {
    if (sumNutr) {
      setShowwNutr(
//        Object.entries(sumNutr).map(([key, value]) => console.log(key, value))
        <div className="w-[90%] mx-auto flex flex-col justify-center items-center gap-8">
          <HorizontalBarChart  userData={bmr} recommendData={sumNutr}/>
          <HorizontalBarChart  userData={bmr} recommendData={sumNutr}/>
          <HorizontalBarChart  userData={bmr} recommendData={sumNutr}/>
          <HorizontalBarChart  userData={bmr} recommendData={sumNutr}/>

        </div>
      );
    }
  }, [sumNutr,bmr])


  /** 디테일 버튼(미완)*/
  const handleDetailButton = (e) => {
    const detailContainer = document.querySelector("#detailContainer");
    detailContainer.classList.remove("hidden");
    setFoodDetailInfo(<FoodDetailInfo/>)
  }

  /** 자동완성 함수(미완) */
  const handleSearchFood = (e) => {
    console.dir(e);
  }

  /** 검색 함수 */
  const handleSearch = (e) => {
    e.preventDefault();
    const search = document.querySelector("#searchfood").value;

    setSearchFood(arr.map((item, idx) =>
      <div key={`key${idx}`} className="w-full h-[10%] xl:h-[10%] p-2 border bg-[#efefef] grid grid-cols-2 shadow-inner rounded-lg mb-1">
        <div className="flex flex-col justify-center border h-[90%] bg-white rounded-md p-2">
          <div id="food_name" className="w-[70%] text-ellipsis drop-shadow text-[80%] md:text-[100%] text-gray-700">{item["food_name"]}</div>
          <div className="flex text-sm text-gray-500">
            <div className="text-[75%] md:text-[90%]">{item["serving_size"] + "g"}</div>
            <div className="text-[75%] md:text-[90%]">&nbsp;{item["kcal"] + "kcal"}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center justify-items-end h-full p-2">
          <div className="flex items-center">
            <input type="number" id="foodServeMn" defaultValue={item["serving_size"]}
              className="border max-w-[4rem] shadow-inner p-1 rounded-lg" /><span>g&nbsp;</span>
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

    // fetch("http://10.125.121.212:8080/searchFoodList",{
    //   method : "POST",
    //   body : JSON.stringify({
    //     "foodname" : search
    //   })
    // })
    // .then(res => res.json())
    // .then(data => {
    //   arr = data;
    //   setSearchFood(arr.map((item,idx) =>
    //   <div key={`key${idx}`} className="w-full h-[10%] xl:h-[10%] p-2 border bg-[#efefef] grid grid-cols-2 shadow-inner rounded-lg mb-1">
    //     <div className="flex flex-col justify-center border h-[90%] bg-white rounded-md p-2">
    //       <div id="food_name" className="w-[70%] text-ellipsis drop-shadow text-[80%] md:text-[100%] text-gray-700">{item["food_name"]}</div>
    //       <div className="flex text-sm text-gray-500">
    //           <div className="text-[75%] md:text-[90%]">{item["serving_size"]+"g"}</div>
    //           <div className="text-[75%] md:text-[90%]">&nbsp;{item["kcal"]+"kcal"}</div>
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center justify-items-end h-full p-2">
    //         <div className="flex items-center">
    //           <input type="number" id="foodServeMn" defaultValue={item["serving_size"]}
    //            className="border max-w-[4rem] shadow-inner p-1 rounded-lg"/><span>g&nbsp;</span>
    //         </div>
    //         <div className="flex">
    //           <button onClick={handleCheckButton} 
    //           className="hover:bg-[#707070] border w-7 h-7 mr-2 text-green-500 shadow-md bg-white rounded-[50%]">✔</button>
    //           <button onClick={handleDetailButton} 
    //           className="hover:bg-[#707070] border w-7 h-7 bg-white shadow-md  rounded-[50%]">🔍</button>
    //         </div>
    //     </div>
    //   </div>
    //  ));
    // })
    // .catch(e => {
    //   console.log(e);
    //   alert("데이터 조회 중 에러 발생");
    // });
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
    if (selectfood) setSelectFood("");
  }

  const today = CalToday();

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

  useEffect(() => {
    setSelectSlot(slotList[selectSlotIndex % 3]);
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

  /** 커서 대면 통계 관련된 정보나오는 함수 */
  const handleCursorInformation = () => {
    setCursorInfo(<CursorInfo/>)
  }

  const hadleCursorOut = () => {
    setCursorInfo('')
  }

  return (
    <div id="container" className="flex flex-col m-auto items-center w-[95%] h-[70rem] relative">
      <div id="detailContainer">{foodDetailInfo}</div>
      <div className="w-full text-2xl sm:text-3xl h-20 flex justify-center items-center">
        <img src={leftarrow} alt="leftarrow" onClick={handleLeftButton} className="h-1/2 sm:h-full hover:cursor-pointer drop-shadow-md" />
        <span className="text-[70%] sm:text-[100%] drop-shadow">{day.slice(0, 4) + "년 " + day.slice(5, 7) + "월 " + day.slice(8, 10) + "일"}</span>
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
              <button 
              onClick={handleSearch} 
              className="hover:cursor-pointer p-1 w-7 h-7 hover:bg-[#707070] shadow-md bg-white 
              rounded-[50%] border flex flex-col justify-center items-center">🔍</button>
            </div>
            <div className="border m-1 lg:h-[95%] h-[85%] overflow-scroll overflow-x-hidden bg-white rounded-xl shadow-inner p-2">
              {searchfood}
            </div>
          </nav>
        </div>
        <div className="border h-[65rem] rounded-lg shadow-lg bg-[#EAEAEA] overflow-scroll overflow-x-hidden p-2">
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
            <div className="border col-span-2 bg-white shadow-inner rounded-lg h-[35rem] overflow-scroll overflow-x-hidden p-2">
              <div className="my-5 w-[90%] mx-auto h-10 border rounded-lg shadow-inner flex justify-center drop-shadow relative items-center">
                <p>식단 분석 🕵️‍♂️</p>
                <button onMouseEnter={handleCursorInformation}
                onMouseLeave={hadleCursorOut} 
                className="absolute right-5 border w-7 h-7 rounded-[50%] z-50
                bg-[#14A8DD] hover:bg-[#3A84F5] text-white shadow-md 
                hover:cursor-pointer p-1 flex justify-center items-center">❕</button>
              </div>
              <div>{cursorInfo}</div>
              { userInfo && <Statistics
                height={+userInfo["height"]}
                weight={+userInfo["weight"]}
                age={+userInfo["age"]}
                gender={+userInfo["gender"]}
                activityFactor={+userInfo["activityFactor"]}
                func={handleUserInfoSaveBt}
              /> }
              {showNutr}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User