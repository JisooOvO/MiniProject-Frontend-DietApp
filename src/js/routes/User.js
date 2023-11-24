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
  const [userInfoView, setUserInfoView] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [cursorInfo, setCursorInfo] = useState('');
  const [foodDetailInfo, setFoodDetailInfo] = useState('');

  let arr;

  /** 접속시 데이터 불러오기 */
  useEffect(() => {
    handleResize();

    fetch("http://10.125.121.212:8080/api/getUserInformation", {
      method: "post",
      headers: {
        "Authorization": token
      },
      body: JSON.stringify({
        "date": day,
        "slot": slot
      })
    })
      .then(res => {
        if(res.status === 200){
          return res.json();
        }else if(res.status === 403){
          alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
          navigate("/login");
        }else{
          alert("데이터 수신 중 에러 발생");
        }
      })
      .then(data => {
        //console.log(data);
        if(data.history !== null){
          setSelectFood(data.history.diets);
          setImageUrl(data.history.img);          
        }else{
          handleCancelButton();
        }

        if(data.HI !== null){
          setUserInfo(data.HI);
          setBmr(
            CalBMR(
              data.HI["height"], 
              data.HI["weight"], 
              data.HI["gender"], 
              data.HI["age"], 
              data.HI["activityFactor"]
            )
          )
          setUserInfoView(
            <Statistics
            height={+data.HI["height"]}
            weight={+data.HI["weight"]}
            age={+data.HI["age"]}
            gender={+data.HI["gender"]}
            activityFactor={+data.HI["activityFactor"]}
            func={handleUserInfoSaveBt}
          />
        )}else{
          setUserInfoView(
            <Statistics
            height={0}
            weight={0}
            age={0}
            gender={1}
            activityFactor={1}
            func={handleUserInfoSaveBt}
          />
        )
        };
      })
      .catch(e => {
        console.log(e)
      });

    // eslint-disable-next-line
  }, [day,slot]);

  
  /** 화면 사이즈에따른 음식 검색 창 반응형 디자인 */
  const handleResize = () => {
    const toggleContainer = document.querySelector("#toggleContainer");
    const hiddenBt = document.querySelector("#hiddenBt");  
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

  const handleToggleContainer = () => {
    const toggleContainer = document.querySelector("#toggleContainer");
    toggleContainer.classList.toggle("hidden");
  }

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
    navigate(`/user/${tomorrow}/${slot}`);
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
        <div key={`key${idx}`} className="h-[60%] md:h-[50%] w-[95%] p-2 border my-2 mx-auto rounded-md shadow-md">
          <div className="flex justify-between mb-1 h-[20%] w-[95%]">
            <div className="flex gap-2 border rounded-md w-[80%] mb-1 shadow-inner bg-[#EFEFEF] p-2 text-gray-700">
              <div className="flex items-center text-[80%]">{item["food_name"]}</div>
              <div className="flex items-center text-[80%]">
                <div>{item["intake_size"] + "g"}</div>
              </div>
            </div>
            <div className="flex items-center mb-1"><button onClick={handleDeleteButton} 
            className="hover:bg-[#707070] border w-7 h-7 shadow-md bg-white rounded-[50%] 
            flex justify-center items-center">❌</button></div>
          </div>
          <div className="h-[70%] w-full flex flex-col justify-center border-t">
            <div className="h-[20%] flex gap-2 items-center">
              <span className="text-[80%] whitespace-nowrap w-[20%] text-center">칼로리</span>
              <Bar nutr={+item["kcal"]} color={"#F7CD01"} isKcal={true} unit={"kcal"} />
            </div>
            <div className="h-[20%] flex gap-2 items-center">
              <span className="text-[80%] whitespace-nowrap w-[20%] text-center">탄수화물</span>
              <Bar nutr={+item["carbohydrate"]} color={"#88CB53"} unit={"g"} type={"탄"}/>
            </div>
            <div className="h-[20%] flex gap-2 items-center">
              <span className="text-[80%] whitespace-nowrap w-[20%] text-center">단백질</span>
              <Bar nutr={+item["protein"]} color={"#35abf4"} unit={"g"} type={"단"}/>
            </div>
            <div className="h-[20%] flex gap-2 items-center">
              <span className="text-[80%] whitespace-nowrap w-[20%] text-center">지방</span>
              <Bar nutr={+item["fat"]} color={"#F54545"} unit={"g"} type={"지"}/>
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

    }else{
      setSelectFoodView('');
    }
  }, [selectfood]);

  /** 유저 정보 전달 함수*/
  const handleUserInfoSaveBt = () => {
    const height = document.querySelector("#height").valueAsNumber;
    const weight = document.querySelector("#weight").valueAsNumber;
    const gender = document.querySelector("#gender").value;
    const age = document.querySelector("#age").valueAsNumber;
    const activityFactor = document.querySelector("#activityFactor").value;

    setBmr(CalBMR(height, weight, gender, age, activityFactor));

    fetch("http://10.125.121.212:8080/api/addUserInformation",{
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
    .then(res => {
      if(res.status === 200){
        setUserInfo({
          "height" : height,
          "weight" : weight,
          "gender" : gender,
          "age" : age,
          "activityFactor" : activityFactor
        })
        alert("저장되었습니다.");
      }
    })
    .catch(e => {
      console.log(e);
      alert("유저 정보 저장 중 에러 발생");
    });
  }

  /** 통계 함수(미완) */
  useEffect(() => {
    if (sumNutr) {
      setShowwNutr(
        <div className="w-[90%] mt-10 mx-auto flex flex-col justify-center items-center gap-8">
          <HorizontalBarChart title={"칼로리"} unit={"kcal"}  userData={sumNutr["총 kcal"]} recommendData={bmr}/>
          <HorizontalBarChart title={"탄수화물"} unit={"g"}  userData={sumNutr["총 carbohydrate"]} recommendData={bmr/ (2 * 4)}/>
          <HorizontalBarChart title={"단백질"} unit={"g"}  userData={sumNutr["총 protein"]} recommendData={+userInfo["weight"]}/>
          <HorizontalBarChart title={"지방"} unit={"g"}  userData={sumNutr["총 fat"]} recommendData={bmr/(5 * 9)}/>
          <HorizontalBarChart title={"당류"} unit={"g"}  userData={sumNutr["총 sugars"]} recommendData={userInfo["gender"] === "1" ? 36 : 24 }/>
          <HorizontalBarChart title={"식이섬유"} unit={"g"}  userData={sumNutr["총 fiber"]} recommendData={userInfo["gender"] === "1" ? 25 : 20}/>
          <HorizontalBarChart title={"나트륨"} unit={"mg"}  userData={sumNutr["총 sodium"]} recommendData={2000}/>
          <HorizontalBarChart title={"트랜스지방"} unit={"g"}  userData={sumNutr["총 trans_fat"]} recommendData={2.2}/>
          <HorizontalBarChart title={"포화지방"} unit={"g"}  userData={sumNutr["총 saturated_fat"]} recommendData={15}/>
          <HorizontalBarChart title={"콜레스테롤"} unit={"mg"}  userData={sumNutr["총 cholesterol"]} recommendData={300}/>
          <HorizontalBarChart title={"칼슘"} unit={"mg"}  userData={sumNutr["총 calcium"]} recommendData={1200}/>
          <HorizontalBarChart title={"마그네슘"} unit={"mg"}  userData={sumNutr["총 magnesium"]} recommendData={userInfo["gender"] === "1" ? 350 : 280}/>
          <HorizontalBarChart title={"비타민B1"} unit={"mg"}  userData={sumNutr["총 vita_b1"]} recommendData={userInfo["gender"] === "1" ? 1.2 : 1.1}/>
          <HorizontalBarChart title={"비타민B2"} unit={"mg"}  userData={sumNutr["총 vita_b2"]} recommendData={userInfo["gender"] === "1" ? 1.5 : 1.2}/>
          <HorizontalBarChart title={"비타민B12"} unit={"mg"}  userData={sumNutr["총 vita_b12"]} recommendData={2.4}/>
          <HorizontalBarChart title={"비타민C"} unit={"mg"}  userData={sumNutr["총 vita_c"]} recommendData={200}/>
        </div>
      );
    }
  }, [sumNutr,userInfo])

  /** 디테일 버튼*/
  const handleDetailButton = (e) => {
    const food_nameElem = e.target.parentNode.parentNode.parentNode.innerText;
    const foodNm = food_nameElem.slice(0,food_nameElem.indexOf("\n"));

    const targetFood = arr.filter((item)=> item["food_name"] === foodNm);

    const detailContainer = document.querySelector("#detailContainer");
    detailContainer.classList.remove("hidden");
    setFoodDetailInfo(<FoodDetailInfo targetFood={targetFood}/>)
  }

  /** 자동완성 함수(미완) */
  const handleSearchFood = (e) => {
    //console.dir(e);
  }

  /** 검색 함수 */
  const handleSearch = (e) => {
    e.preventDefault();
    const search = document.querySelector("#searchfood").value;

    setSearchFood('');

    // setSearchFood(arr.map((item, idx) =>
    //   <div key={`key${idx}`} className="w-full h-[30%] lg:h-[20%] xl:h-[10%] p-2 border bg-[#efefef] grid grid-cols-2 shadow-inner rounded-lg mb-1">
    //     <div className="flex flex-col justify-center border h-[90%] bg-white rounded-md p-2">
    //       <div id="food_name" className="w-[70%] text-ellipsis drop-shadow text-[80%] md:text-[100%] text-gray-700">{item["food_name"]}</div>
    //       <div className="flex text-sm text-gray-500">
    //         <div className="text-[75%] md:text-[90%]">{item["serving_size"] + "g"}</div>
    //         <div className="text-[75%] md:text-[90%]">&nbsp;{item["kcal"] + "kcal"}</div>
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center justify-items-end h-full p-2">
    //       <div className="flex items-center">
    //         <input type="number" id="foodServeMn" defaultValue={item["serving_size"]}
    //           className="border max-w-[4rem] shadow-inner p-1 rounded-lg" /><span>g&nbsp;</span>
    //       </div>
    //       <div className="flex">
    //         <button onClick={handleCheckButton}
    //           className="hover:bg-[#707070] border w-7 h-7 mr-2 text-green-500 shadow-md bg-white rounded-[50%]">✔</button>
    //         <button onClick={handleDetailButton}
    //           className="hover:bg-[#707070] border w-7 h-7 bg-white shadow-md  rounded-[50%]">🔍</button>
    //       </div>
    //     </div>
    //   </div>
    //));

    fetch("http://10.125.121.212:8080/api/searchFoodList",{
      method : "POST",
      headers : {
        "Authorization" : token
      },
      body : JSON.stringify({
        "foodname" : search
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        arr = data;

      setSearchFood(arr.map((item,idx) =>
        <div key={`key${idx}`} className="w-full h-[8rem] p-2 border bg-[#efefef] grid grid-cols-2 shadow-inner rounded-lg mb-1">
          <div className="flex flex-col justify-center border h-[90%] bg-white rounded-md p-2">
            <div id="food_name" className="w-[70%] text-ellipsis drop-shadow text-[80%] md:text-[100%] text-gray-700">{item["food_name"]}</div>
            <div className="flex text-sm text-gray-500">
                <div className="text-[75%] md:text-[90%]">{item["serving_size"]+"g"}</div>
                <div className="text-[75%] md:text-[90%]">&nbsp;{item["kcal"]+"kcal"}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center justify-items-end h-full p-2">  
              <div className="flex items-center">
                <input type="number" id="foodServeMn" defaultValue={item["serving_size"]}
                className="border max-w-[4rem] shadow-inner p-1 rounded-lg"/><span>g&nbsp;</span>
              </div>
              <div className="flex">
                <button onClick={handleCheckButton} 
                className="hover:bg-[#707070] border w-7 h-7 mr-2 text-green-500 shadow-md bg-white rounded-[50%]">✔</button>
                <button onClick={handleDetailButton}
                className="hover:bg-[#707070] border w-7 h-7 bg-white shadow-md  rounded-[50%]">🔎</button>
              </div>
          </div>
        </div>
      ))};
    })
    .catch(e => {
      console.log(e);
      alert("데이터 조회 중 에러 발생");
    });
  }

  /** 저장 함수 */
  const handleSaveButton = () => {
    console.log(selectfood);
    fetch("http://10.125.121.212:8080/api/addFoodList", {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type" : "application/json"
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
        }else if(res.status === 400){
          alert("")
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
    setSelectFood("");
    img.classList.add('myhidden');
    preview.classList.remove("hidden");
    
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
    if (isClickSlotButton) navigate(`/user/${day}/${selectSlot}`);

    setIsClickSlotButton(false);
  }, [selectSlot])

  /** 커서 대면 통계 관련된 정보나오는 함수 */
  const handleCursorInformation = () => {
    setCursorInfo(<CursorInfo/>)
  }

  const hadleCursorOut = () => {
    setCursorInfo('')
  }

  return (
    <div id="container" className="flex flex-col m-auto items-center w-[95%] relative">
      <div id="detailContainer">{foodDetailInfo}</div>
      <div className="w-full text-2xl sm:text-3xl mt-2 h-20 flex justify-center items-center">
        <img src={leftarrow} alt="leftarrow" onClick={handleLeftButton} className="h-1/2 sm:h-full hover:cursor-pointer drop-shadow-md" />
        <span className="text-[70%] sm:text-[100%] drop-shadow">{day.slice(0, 4) + "년 " + day.slice(5, 7) + "월 " + day.slice(8, 10) + "일"}</span>
        <img src={rightarrow} alt="rightarrow" onClick={handleRightButton} className="h-1/2 sm:h-full hover:cursor-pointer drop-shadow-md" />
      </div>
      <div className="flex gap-1 justify-between w-full">
        <button id="hiddenBt" onClick={handleToggleContainer}
          className="border hidden rounded-lg whitespace-nowrap text-[60%] sm:text-[100%] shadow-lg w-48 h-8 mb-2 
        bg-[#14A8DD] hover:bg-[#3A84F5] text-white">음식 검색하기 🔻</button>
        <div className="flex gap-1 justify-end w-full">
          <button onClick={handleCancelButton} className="border rounded-lg shadow-lg w-24 h-8 mb-2 text-[60%] sm:text-[100%]  bg-[#14A8DD] hover:bg-[#3A84F5] text-white">초기화</button>
          <button onClick={handleSaveButton} className="border rounded-lg shadow-lg w-24 h-8 mb-2 text-[60%] sm:text-[100%]  bg-[#14A8DD] hover:bg-[#3A84F5] text-white">저장하기</button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-2 w-full">
        <div id="toggleContainer" 
        className="border rounded-lg p-2 shadow-lg bg-[#EAEAEA] h-[30rem] lg:h-[70rem]">
            <div className="mb-2 w-full relative flex items-center gap-2">
              <input id="searchfood" type="text" name="food"
                className="w-[98%] p-2 shadow-inner rounded-lg border-b-2" onKeyDown={handleSearchFood} placeholder="음식을 검색하세요" />
              <button 
              onClick={handleSearch} 
              className="hover:cursor-pointer p-1 w-7 h-7 hover:bg-[#707070] shadow-md bg-white 
              rounded-[50%] border flex flex-col justify-center items-center">🔍</button>
            </div>
            <div className="border m-1 lg:h-[95%] h-[90%] bg-white rounded-xl shadow-inner p-2 overflow-scroll overflow-x-hidden">
              {searchfood}
            </div>
        </div>
        <div className="border rounded-lg shadow-lg bg-[#EAEAEA] p-2 lg:h-[70rem]">
          <div className="h-10 flex justify-between items-center border rounded-lg bg-white shadow-inner m-2">
            <img src={leftarrow} alt="leftarrow" onClick={handleSlotLeftButton} className="h-full hover:cursor-pointer drop-shadow-md" />
            <div>{selectSlot}</div>
            <img src={rightarrow} alt="rightarrow" onClick={handleSlotRightButton} className="h-full hover:cursor-pointer drop-shadow-md" />
          </div>
          <div className="grid grid-cols-1 grid-rows-2 gap-1 md:grid-cols-2 p-4 w-full lg:h-[87%]">
            <ImgUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
            <div 
            className="border row-start-2 md:row-start-1 overflow-scroll w-full overflow-x-hidden 
            bg-white rounded-lg shadow-inner">
              <div className="my-5 w-[90%] mx-auto h-10 border rounded-lg shadow-inner drop-shadow flex justify-center items-center">식단</div>
              {selectfoodView}
            </div>
            <div 
            className="border col-span-2 bg-white shadow-inner rounded-lg h-min sm:h-[35rem]
            sm:overflow-scroll sm:overflow-x-hidden p-2">
              <div className="my-5 w-[90%] mx-auto h-10 border rounded-lg shadow-inner 
              flex justify-center drop-shadow relative items-center">
                <p>식단 분석 🕵️‍♂️</p>
                <button onMouseEnter={handleCursorInformation}
                onMouseLeave={hadleCursorOut} 
                className="absolute right-5 border w-7 h-7 rounded-[50%] z-50
                bg-[#14A8DD] hover:bg-[#3A84F5] text-white shadow-md 
                hover:cursor-pointer p-1 flex justify-center items-center">❕</button>
              </div>
              <div>{cursorInfo}</div>
              {userInfoView}
              {showNutr}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User