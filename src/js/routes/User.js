import leftarrow from "../../images/left_arrow.png";
import rightarrow from "../../images/right_arrow.png";
import { useNavigate, useParams } from "react-router-dom";
import { CalTomorrow, CalYesterday } from "../common/Calday"
import { useEffect, useState } from "react";
import Bar from "../common/Bar";
import ImgUpload from "../common/ImgUpload";
import "../../style/myhidden.css";
import Statistics from "../common/Statistics";
import CalBMR from "../common/CalBMR.js";
import HorizontalBarChart from "../common/HorizontalBarChart.js";
import CursorInfo from "../common/CursorInfo.js";
import FoodDetailInfo from "../common/FoodDetailInfo.js";
import SearchFoodList from "../common/SearchFoodList.js";

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
  const token = sessionStorage.getItem("token");
  const [isClickSlotButton, setIsClickSlotButton] = useState(false);
  const [sumNutr, setSumwNutr] = useState('');
  const [showNutr, setShowwNutr] = useState('');
  const [bmr,setBmr] = useState(0);
  const [userInfoView, setUserInfoView] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [cursorInfo, setCursorInfo] = useState('');
  const [foodDetailInfo, setFoodDetailInfo] = useState('');
  const [fastSearch, setFastSearch] = useState('');
  const [favoriteList, setFavoriteList] = useState('');
  const [searchFoodList, setSearchFoodList] = useState('');

  const isValidDateFormat = (inputDate) => {
    const dateObject = new Date(inputDate);
    return (
      dateObject instanceof Date && !isNaN(dateObject) && inputDate === dateObject.toISOString().split('T')[0]
    );
  };

  /** 접속시 데이터 불러오기 */
  useEffect(() => {
    const isValidDate = isValidDateFormat(day);
    const isValidSlot = slotList.includes(slot);

    handleResize();

    if (!isValidDate || !isValidSlot) {
      navigate('/NotFound');
    }

    fetch("http://10.125.121.212:8080/api/private/getUserInformation", {
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
      if(data.Favor !== null){
        setFavoriteList(data.Favor.map(item => item["foodname"]))
      }

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
    setSelectFood((prevItem => prevItem.filter((item) => item["foodname"] !== searchfoodNm)));
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
    const foodNm = e.target.parentNode.parentNode.parentNode.parentNode.innerText;
    const foodServeMn = foodNm.split("\n");

    let temp = JSON.parse(JSON.stringify(searchFoodList.filter((item) =>
      item["foodname"] === foodServeMn[0]
    )));

    temp[0]["intake_size"] = e.target.parentNode.parentNode.parentNode.firstChild.firstChild.valueAsNumber

    let gram = +temp[0]["intake_size"];
    let oriGram = +temp[0]["serving_size"];

    Object.entries(temp[0]).forEach(([key, value]) => {
      if (key === "foodname" || key === "intake_size" || key === "serving_size") {
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
        const foodNm = selectfood[idx]["foodname"];
        for (let i = selectfood.length - 1; i > idx; i--) {
          const compareNm = selectfood[i]["foodname"];
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
              <div className="flex items-center text-[80%]">{item["foodname"]}</div>
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

    fetch("http://10.125.121.212:8080/api/private/addUserInformation",{
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

  /** 통계 함수 */
  useEffect(() => {
    if (sumNutr) {
      setShowwNutr(
        <div className="w-[90%] mt-10 mx-auto flex flex-col justify-center items-center gap-8">
          <HorizontalBarChart title={"칼로리"} unit={"kcal"}  userData={sumNutr["총 kcal"]} recommendData={bmr}/>
          <HorizontalBarChart title={"탄수화물"} unit={"g"}  userData={sumNutr["총 carbohydrate"]} recommendData={bmr/ (2 * 4)}/>
          <HorizontalBarChart title={"단백질"} unit={"g"}  userData={sumNutr["총 protein"]} recommendData={userInfo["weight"] ? userInfo["weight"] * 1.2 : bmr / (4 * 4) }/>
          <HorizontalBarChart title={"물"} unit={"mL"}  userData={sumNutr["총 water"]} recommendData={2000}/>
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
  }, [sumNutr,userInfo,bmr])

  /** 디테일 버튼*/
  const handleDetailButton = (e) => {
    const food_nameElem = e.target.parentNode.parentNode.parentNode.parentNode.innerText;
    const foodNm = food_nameElem.slice(0,food_nameElem.indexOf("\n"));

    const targetFood = searchFoodList.filter((item)=> item["foodname"] === foodNm);

    const detailContainer = document.querySelector("#detailContainer");
    detailContainer.classList.remove("hidden");
    setFoodDetailInfo(<FoodDetailInfo targetFood={targetFood}/>)
  }

  function isInitialConsonant(char) {
    const initialConsonants = /ㄱ|ㄲ|ㄴ|ㄷ|ㄸ|ㄹ|ㅁ|ㅂ|ㅃ|ㅅ|ㅆ|ㅇ|ㅈ|ㅉ|ㅊ|ㅋ|ㅌ|ㅍ|ㅎ/;
    return initialConsonants.test(char);
  }

  /** 자동완성 함수 */
  const handleSearchFood = (e) => {
    const targetNm = e.target.value;

    if(isInitialConsonant(targetNm)) return;
    if(targetNm === '') return;

    fetch("http://10.125.121.212:8080/api/private/fastSearch2",{
      method : 'post',
      headers : {
        "Authorization" : token,
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        "foodname" : targetNm
      })
    })
    .then(res => res.json())
    .then(data => {
      const target = data.map(item => item["foodname"]).slice();
      if(target.length > 0){
        setFastSearch(target.map((item,idx)=>
          <div key={`key${idx}`} tabIndex={1}  id="fastSearchItem"
          className="border z-50 p-1 hover:bg-[#EAEAEA] focus:bg-[#EAEAEA]"
          onKeyDown={(e)=>{
            const searchfood = document.querySelector("#searchfood");
            if(e.key === "Enter") {
              searchfood.value = e.target.innerText;
              handleSearch(e);
              setFastSearch('');
            }
            if(e.key === "ArrowDown"){
              e.preventDefault();
              const next = e.target.nextSibling;
              if(next) next.focus();
              else searchfood.focus();
            }
            if(e.key === "ArrowUp"){
              e.preventDefault();
              const prev = e.target.previousSibling;
              if(prev) prev.focus();
              else searchfood.focus();
            }
          }}
          onClick={(e)=>{
            const searchfood = document.querySelector("#searchfood");
            searchfood.value = e.target.innerText;
            handleSearch(e);
            setFastSearch('');
          }}
          >{item}</div>
        ))
      }
      
      if(target.length === 0){
        setFastSearch(
          <div>검색 조건에 해당하는 음식이 존재하지 않습니다.</div>
        )
      }
    })
    .catch(e => console.log(e));
  }


  /** 검색 함수 */
  const handleSearch = (e) => {
    e.preventDefault();
    const search = document.querySelector("#searchfood").value;

    setSearchFood('');

    fetch("http://10.125.121.212:8080/api/private/searchFoodList",{
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
     setSearchFoodList(data);
    })
    .catch(e => {
      console.log(e);
      alert("데이터 조회 중 에러 발생");
    });
  }

  useEffect(()=>{
    if(!searchFoodList) return;
    if(searchFoodList.length === 0){
      setSearchFood(
        <div className="w-full h-[30%] lg:h-[20%] xl:h-[10%] p-2 border bg-[#efefef] grid grid-cols-2 items-center justify-center shadow-inner rounded-lg mb-1">
          검색 조건에 해당하는 음식이 존재하지 않습니다.
        </div>
      )
    }else{
      setSearchFood(searchFoodList.map((item,idx) =>
        <SearchFoodList key={`key${idx}`} item={item} idx={idx} favoriteList={favoriteList} handleAddFavoritesButton={handleAddFavoritesButton} handleCheckButton={handleCheckButton} handleDetailButton={handleDetailButton}/>
      ))
    };
  },[searchFoodList,favoriteList])

  /** 저장 함수 */
  const handleSaveButton = () => {
    fetch("http://10.125.121.212:8080/api/private/addFoodList", {
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
    // eslint-disable-next-line
  }, [selectSlot])

  /** 커서 대면 통계 관련된 정보나오는 함수 */
  const handleCursorInformation = () => {
    setCursorInfo(<CursorInfo/>)
  }

  const hadleCursorOut = () => {
    setCursorInfo('')
  }

  /** 즐겨찾기 검색 함수 */
  const handleFavorites = (e) => {
    e.preventDefault();
    setSearchFood('');
    fetch("http://10.125.121.212:8080/api/private/searchFavoriteFoods",{
      method : "post",
      headers : {
        "Authorization" : token,
      }
    })
    .then(res => res.json())
    .then(data => {
      setSearchFoodList(data);
    })
    .catch(e => console.log(e));
  }

  /** 즐거찾기 등록 함수(미완) */
  const handleAddFavoritesButton = (e) => {
    const target = e.target.parentNode.parentNode.parentNode.parentNode.innerText;
    const targetName = target.slice(0,target.indexOf("\n"));
    setSearchFood('');
    fetch("http://10.125.121.212:8080/api/private/addFavoriteFood",{
      method : "post",
      headers : {
        "Authorization" : token,
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        "foodname" : targetName
      })
    })
    .then(res => {
      if(res.status === 200){
        setFavoriteList(prevItem => [...prevItem, targetName])
        alert("즐겨찾기에 추가되었습니다");
      }else{
        fetch("http://10.125.121.212:8080/api/private/deleteFavoriteFood",{
          method : "delete",
          headers : {
            "Authorization" : token,
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            "foodname" : targetName
          })
        })
        .then(res => {
          if(res.status === 200){
            setFavoriteList(prevItem => prevItem.filter( item => item !== targetName ));
            setSearchFoodList(prevItem => prevItem.filter( item => item["foodname"] !== targetName));
            alert("즐겨찾기에서 제외했습니다");
          }else{
            alert("데이터 전송 중 에러 발생");
          }
        })
        .catch(e => console.log(e));
      }})
    .catch(e => console.log(e))
  };

  /** 달력 날짜 이동 함수 */
  const handleChangeDate = (e) => {
    const targetDate = e.target.value
    navigate(`/user/${targetDate}/${slot}`)
  }

  /** 자동완성 함수 키다운시 발생하는 함수 */
  const handleInputSearchKeydown = (e) => {
    const fastSearch = document.querySelector("#fastSearch");
    const fastSearchItem = document.querySelectorAll("#fastSearchItem");
    if( e.key === "ArrowDown"){
      e.preventDefault();
      fastSearchItem[0].focus();
    }
  }

  return (
    <div id="container" className="flex flex-col m-auto items-center w-[95%] relative">
      <div id="detailContainer">{foodDetailInfo}</div>
      <div className="w-full text-2xl sm:text-3xl mt-2 h-20 flex justify-center items-center">
        <img src={leftarrow} alt="leftarrow" onClick={handleLeftButton} className="h-1/2 sm:h-full hover:cursor-pointer drop-shadow-md" />
        <div className="text-[80%] w-[40%] text-center sm:text-[100%] drop-shadow relative">
          {day.slice(0, 4) + "년 " + day.slice(5, 7) + "월 " + day.slice(8, 10) + "일"}
          <input type="date" onChange={handleChangeDate} id="date1" name="date1" className="w-full absolute top-0 left-0 opacity-0" defaultValue={day}/>
        </div>
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
        className="border rounded-lg p-2 shadow-lg bg-[#EAEAEA] h-[30rem] xl:h-[70rem]">
            <form className="mb-2 w-full relative flex items-center gap-2">
                <input id="searchfood" type="text" name="food"
                  className="w-full p-2 shadow-inner rounded-lg border-b-2"
                  onChange={handleSearchFood}
                  onKeyDown={handleInputSearchKeydown}
                  autoComplete="off"
                  placeholder="음식을 검색하세요" />
                { fastSearch ?
                <div id="fastSearch" onMouseLeave={()=>{setFastSearch('')}} tabIndex={1}
                className="absolute top-[100%] bg-white border-2 border-gray-700 rounded-md w-full mt-1 z-50">{fastSearch}</div> : '' }
              <div className="relative">
                <span id="searchBt" className="text-sm hidden absolute -top-4 -left-3 whitespace-nowrap">검색하기</span>
                <button
                onClick={handleSearch} 
                onMouseEnter={()=>{
                  const searchBt = document.querySelector("#searchBt");
                  searchBt.classList.remove("hidden");
                }}
                onMouseLeave={()=>{
                  const searchBt = document.querySelector("#searchBt");
                  searchBt.classList.add("hidden");
                }}
                className="hover:cursor-pointer p-1 w-7 h-7 hover:bg-[#707070] shadow-md bg-white
                rounded-[50%] border flex flex-col justify-center items-center">
                  🔍
                </button>
              </div> 
              <div className="relative">
                <span id="favoritesBt" className="text-sm hidden absolute -top-4 -left-2 whitespace-nowrap">즐겨찾기</span>
                <button
                onClick={handleFavorites}
                onMouseEnter={()=>{
                  const favoritesBt = document.querySelector("#favoritesBt");
                  favoritesBt.classList.remove("hidden");
                }}
                onMouseLeave={()=>{
                  const favoritesBt = document.querySelector("#favoritesBt");
                  favoritesBt.classList.add("hidden");
                }}
                className="hover:cursor-pointer p-1 w-7 h-7 hover:bg-[#707070] shadow-md bg-white text-yellow-300
                rounded-[50%] border flex flex-col justify-center items-center">
                  ★
                </button>
              </div>
            </form>
            <div className="border m-1 xl:h-[95%] h-[88%] bg-white rounded-xl shadow-inner p-2 overflow-scroll overflow-x-hidden">
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