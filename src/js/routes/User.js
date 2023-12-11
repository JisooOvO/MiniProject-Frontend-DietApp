
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import ImgUpload from "../user/ImgUpload";
import UserInformation from "../user/UserInformation";
import CalBMR from "../common/CalBMR.js";
import HorizontalBarChart from "../user/HorizontalBarChart.js";
import CursorInfo from "../user/CursorInfo.js";
import FoodDetailInfo from "../user/foodDetail/FoodDetailInfo.js";
import SearchFoodList from "../user/SearchFoodList.js";
import Loading from "../common/Loading.js";
import UserHeader from "../user/UserHeader.js";
import UserNav from "../user/UserNav.js";
import SelectFoodView from "../user/SelectFoodView.js";
import UserSearchWrapper from "../user/UserSearchWrapper.js";
import UserSlotNav from "../user/UserSlotNav.js";

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
  const [bmr, setBmr] = useState(0);
  const [userInfoView, setUserInfoView] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [cursorInfo, setCursorInfo] = useState('');
  const [foodDetailInfo, setFoodDetailInfo] = useState('');
  const [fastSearch, setFastSearch] = useState('');
  const [favoriteList, setFavoriteList] = useState('');
  const [searchFoodList, setSearchFoodList] = useState('');
  const [todayTotalNutrientInfo,setTodayTotalNutrientInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /** 날짜 유효성 검사 함수 */
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

    setUserInfoView('');
    setIsLoading(true);
    fetch("http://healthyfit3-env.eba-hmvcyftc.ap-northeast-2.elasticbeanstalk.com/api/private/getUserInformation", {
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
      if (res.status === 200) {
        return res.json();
      } 
      else {
        alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    })
    .then(data => {
      setIsLoading(false);
      if (data.Favor !== null) {
        setFavoriteList(data.Favor.map(item => item["foodname"]))
      }
      if (data.history !== null) {
        setSelectFood(data.history.diets);
        setImageUrl(data.history.img);
      } 
      else {
        handleCancelButton();
      }

      if (data.HI !== null) {
        if(data.HI["gender"] === "MAN") data.HI["gender"] = 1;
        if(data.HI["gender"] === "WOMAN") data.HI["gender"] = 2;
        data.HI["age"] = new Date().getFullYear() - data.HI["year"];
        let weight = 0;
        if(data.history !== null) weight = data.history["weight"] 
        setUserInfo(data.HI);
        setBmr(CalBMR( data.HI["height"], weight, data.HI["gender"], data.HI["age"], data.HI["activityFactor"]))
        setUserInfoView(<UserInformation height={+data.HI["height"]} weight={weight} age={+data.HI["age"]} gender={+data.HI["gender"]} activityFactor={+data.HI["activityFactor"]} func={handleUserInfoSaveBt}/>)
      } 
      else {
        setUserInfoView(<UserInformation height={0} weight={0} age={0} gender={1} activityFactor={1} func={handleUserInfoSaveBt}/>)
      };
    })
    .catch(e => {
      console.log(e);
    })
  
    // eslint-disable-next-line
  }, [day, slot]);

  useEffect(()=>{
    setIsLoading(false);
  },[userInfoView])

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
    if (window.innerWidth >= 768) 
      handleResize();
  });

  /** 삭제 함수 */
  const handleDeleteButton = (e) => {
    const foodNm = e.target.parentNode.parentNode.innerText;
    const searchfoodNm = foodNm.slice(0, foodNm.indexOf("\n"));
    setSelectFood((prevItem => prevItem.filter((item) => item["foodname"] !== searchfoodNm)));
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
        <SelectFoodView key={`key${idx}`} item={item} idx={idx} handleDeleteButton={handleDeleteButton}/>
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
        "totalKcal": totalKcal,
        "totalWater": totalWater,
        "totalProtein": totalProtein,
        "totalFat": totalFat,
        "totalCarbohydrate": totalCarbohydrate,
        "totalSugars": totalSugars,
        "totalFiber": totalFiber,
        "totalCalcium": totalCalcium,
        "totalMagnesium": totalMagnesium,
        "totalSodium": totalSodium,
        "totalVitaB1": totalB1,
        "totalVitaB2": totalB2,
        "totalVitaB12": totalB12,
        "totalVitaC": totalC,
        "totalCholesterol": totalCholesterol,
        "totalSaturatedFat": totalSaturated,
        "totalTransFat": totalTrans
      });
    } 
    else {
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

    fetch("http://healthyfit3-env.eba-hmvcyftc.ap-northeast-2.elasticbeanstalk.com/api/private/addUserInformation", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        "date" : day,
        "slot" : slot,
        "height": height,
        "weight": weight,
        "gender": gender,
        "age": age,
        "activityFactor": activityFactor
      })
    })
    .then(res => {
      if (res.status === 200) {
        setUserInfo({
          "height": height,
          "weight": weight,
          "gender": gender,
          "age": age,
          "activityFactor": activityFactor
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
          {
            [
              ["칼로리","kcal","totalKcal",bmr],
              ["탄수화물","g","totalCarbohydrate", bmr / (2 * 4)],
              ["단백질","g","totalProtein",userInfo["weight"] ? userInfo["weight"] * 1.2 : bmr / (4 * 4)],
              ["물","mL","totalWater",2000],
              ["지방","g","totalFat",bmr / (5 * 9)],
              ["당류","g","totalSugars",userInfo["gender"] === 1 ? 36 : 24],
              ["식이섬유","g","totalFiber",userInfo["gender"] === 1 ? 25 : 20],
              ["나트륨","mg","totalSodium",2000],
              ["트랜스지방","g","totalTransFat",2.2],
              ["포화지방","g","totalTransFat",15],
              ["콜레스테롤","mg","totalSaturatedFat",300],
              ["칼슘","mg","totalCalcium",1200],
              ["마그네슘","mg","totalMagnesium",userInfo["gender"] === 1 ? 350 : 280],
              ["비타민B1","mg","totalVitaB1",userInfo["gender"] === 1 ? 1.2 : 1.1],
              ["비타민B2","mg","totalVitaB2",userInfo["gender"] === 1 ? 1.5 : 1.2],
              ["비타민B12","µg","totalVitaB12",2.4],
              ["비타민C","mg","totalVitaC",200],
            ].map((item,idx) => <HorizontalBarChart key={`key${idx}`} title={item[0]} unit={item[1]} userData={sumNutr[item[2]]} recommendData={item[3]} />)
          }
        </div>
      );
    }
  }, [sumNutr, userInfo, bmr])

  /** 디테일 버튼*/
  const handleDetailButton = (e) => {
    const food_nameElem = e.target.parentNode.parentNode.parentNode.parentNode.innerText;
    const foodNm = food_nameElem.slice(0, food_nameElem.indexOf("\n"));
    const targetFood = searchFoodList.filter((item) => item["foodname"] === foodNm);
    const detailContainer = document.querySelector("#detailContainer");
    detailContainer.classList.remove("hidden");
    setFoodDetailInfo(<FoodDetailInfo targetFood={targetFood} />)
  }

  useEffect(() => {
    if (!searchFoodList) return;
    if (searchFoodList.length === 0) {
      setSearchFood(
        <div className="w-full h-[30%] lg:h-[20%] xl:h-[10%] p-2 border bg-[#efefef] flex items-center justify-center shadow-inner rounded-lg mb-1">
          검색 조건에 해당하는 음식이 존재하지 않습니다.
        </div>
      )
    } else {
      setSearchFood(searchFoodList.map((item, idx) =>
        <SearchFoodList key={`key${idx}`} item={item} idx={idx} favoriteList={favoriteList} handleAddFavoritesButton={handleAddFavoritesButton} handleCheckButton={handleCheckButton} handleDetailButton={handleDetailButton} />
      ))
    };
    // eslint-disable-next-line
  }, [searchFoodList, favoriteList])

  /** 초기화 함수 */
  const handleCancelButton = () => {
    const preview = document.getElementById("preview");
    const img = document.getElementById("img");
    const input = document.getElementById('image');
    input.value = ''
    setImageUrl("");
    setSelectFood([]);
    img.classList.add('myhidden');
    preview.classList.remove("hidden");
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

  /** 유저 정보 옆 (!) 버튼 관련 함수 */
  const handleCursorInformation = () => {
    setCursorInfo(<CursorInfo />)
  }

  const hadleCursorOut = () => {
    setCursorInfo('')
  }

  /** 즐거찾기 등록 함수 */
  const handleAddFavoritesButton = (e) => {
    const target = e.target.parentNode.parentNode.parentNode.parentNode.innerText;
    const targetName = target.slice(0, target.indexOf("\n"));
    setSearchFood('');
    fetch("http://healthyfit3-env.eba-hmvcyftc.ap-northeast-2.elasticbeanstalk.com/api/private/addFavoriteFood", {
      method: "post",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "foodname": targetName
      })
    })
    .then(res => {
      if (res.status === 200) {
        setFavoriteList(prevItem => [...prevItem, targetName])
        alert("즐겨찾기에 추가되었습니다");
      } 
      else {
        fetch("http://healthyfit3-env.eba-hmvcyftc.ap-northeast-2.elasticbeanstalk.com/api/private/deleteFavoriteFood", {
          method: "delete",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "foodname": targetName
          })
        })
        .then(res => {
          if (res.status === 200) {
            setFavoriteList(prevItem => prevItem.filter(item => item !== targetName));
            setSearchFoodList(prevItem => prevItem.filter(item => item["foodname"] !== targetName));
            alert("즐겨찾기에서 제외했습니다");
          } else {
            alert("데이터 전송 중 에러 발생");
          }
        })
        .catch(e => console.log(e));
      }
    })
    .catch(e => console.log(e))
  };

  return (
    <div id="container" className="flex flex-col m-auto items-center w-[95%] relative px-10">
      { isLoading ? <div className="absolute w-screen h-full z-[9999] opacity-70 bg-gray-500 "><Loading/></div> : '' } {/* 로딩 창 */}
      <div id="detailContainer">{foodDetailInfo}</div> {/* 음식 정보 디테일 모달 */}
      <div id="todayTotalNutrientContainer">{todayTotalNutrientInfo}</div> {/* 하루 전체 영양소 통계 모달 */}
      <UserHeader day={day} slot={slot} />
      <UserNav setIsLoading={setIsLoading} token={token} day={day} setTodayTotalNutrientInfo={setTodayTotalNutrientInfo} bmr={bmr} userInfo={userInfo} slot={slot} selectfood={selectfood} imageUrl={imageUrl} sumNutr={sumNutr} handleCancelButton={handleCancelButton}/>
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-2 w-full">
        <UserSearchWrapper setSearchFood={setSearchFood} setIsLoading={setIsLoading} setSearchFoodList={setSearchFoodList} token={token} fastSearch={fastSearch} setFastSearch={setFastSearch} searchfood={searchfood}/>

        <div className="border rounded-lg shadow-lg bg-[#EAEAEA] p-2 lg:h-[70rem]">
          <UserSlotNav setSelectSlotIndex={setSelectSlotIndex} setIsClickSlotButton={setIsClickSlotButton} selectSlot={selectSlot}/>
          <div className="grid grid-cols-1 grid-rows-2 gap-1 md:grid-cols-2 p-4 w-full lg:h-[87%]">
            <ImgUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
            <div className="border row-start-2 md:row-start-1 overflow-scroll w-full overflow-x-hidden bg-white rounded-lg shadow-inner">
              <div className="my-5 w-[90%] mx-auto h-10 border rounded-lg shadow-inner drop-shadow flex justify-center items-center">식단</div>
              {selectfoodView}
            </div>
            <div
              className="border col-span-2 bg-white shadow-inner rounded-lg h-min sm:h-[35rem] sm:overflow-scroll sm:overflow-x-hidden p-2">
              <div className="my-5 w-[90%] mx-auto h-10 border rounded-lg shadow-inner flex justify-center drop-shadow relative items-center">
                <p>식단 분석 🕵️‍♂️</p>
                <button onMouseEnter={handleCursorInformation} onMouseLeave={hadleCursorOut} className="absolute right-5 border w-7 h-7 rounded-[50%] z-50 bg-[#14A8DD] hover:bg-[#3A84F5] text-white shadow-md hover:cursor-pointer p-1 flex justify-center items-center">❕</button>
              </div>
              <div>{cursorInfo}</div>
              {userInfoView ? userInfoView : ''}
              {showNutr}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User