import IsLogin from "../common/IsLogin";
import leftarrow from "../../images/left_arrow.png";
import rightarrow from "../../images/right_arrow.png";
import { useNavigate, useParams } from "react-router-dom";
import { CalToday, CalTomorrow, CalYesterday } from "../common/Calday"
import { useEffect, useState } from "react";
import Bar from "../common/Bar";
import ImgUpload from "../common/ImgUpload";
import "../../style/myhidden.css";

const User = () => {
  IsLogin();

  const [searchfood,setSearchFood] = useState();
  const [selectfood,setSelectFood] = useState([]);
  const [selectfoodView,setSelectFoodView] = useState();
  const navigate = useNavigate();
  const day = useParams().date;
  const slot = useParams().slot;
  const slotList = ["아침","점심","저녁","간식"];
  const [selectSlotIndex, setSelectSlotIndex] = useState(0);
  const [selectSlot, setSelectSlot] = useState(slotList[0]);
  const [imageUrl, setImageUrl] = useState('');
  const token = localStorage.getItem("token");
  const [showNutr, setShowNutr] = useState('');

  let arr;
  // const arr = [
  //   { 
  //     "식품명" : "감자",
  //     "_1회제공량" : 100,
  //     "칼로리" : 80,
  //     "탄수화물" : 30,
  //     "단백질" : 10,
  //     "지방" : 50
  //   }, 
  //   { 
  //     "식품명" : "고구마",
  //     "_1회제공량" : 200,
  //     "칼로리" : 20,
  //     "탄수화물" : 50,
  //     "단백질" : 70,
  //     "지방" : 90
  //   },
  //   {
  //     "식품명" : "고르곤졸라피자고르곤졸라피자고르곤졸라피자",
  //     "_1회제공량" : 600,
  //     "칼로리" : 1200,
  //     "탄수화물" : 120,
  //     "단백질" : 70,
  //     "지방" : 100
  //   },
  //   {
  //     "식품명" : "제로콜라",
  //     "_1회제공량" : 100,
  //     "칼로리" : 400,
  //     "탄수화물" : 250,
  //     "단백질" : 72,
  //     "지방" : 9
  //   }
  // ];

  useEffect(()=>{
    fetch("http://10.125.121.212:8080/getFoodList",{
      method : "post",
      headers : {
        "Authorization" : token
      },
      body : JSON.stringify({
        "date" : day,
        "slot" : slot
      })
    })
    .then(res => console.log(res))
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.log(e));
  // eslint-disable-next-line
  },[])

  const handleDeleteButton = (e) => {
    const foodNm = e.target.parentNode.parentNode.innerText;
    const searchfoodNm = foodNm.slice(0,foodNm.indexOf("\n"))
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

    console.log(arr);
    console.log(temp[0]);

    temp[0]["섭취량"] = e.target.parentNode.parentNode.firstChild.firstChild.valueAsNumber

    let gram = +temp[0]["섭취량"];
    let oriGram = +temp[0]["_1회제공량"];


    Object.entries(temp[0]).forEach(([key,value]) => {
      if(key === "식품코드" || key === "식품명" || key === "섭취량" || key === "_1회제공량"){
        temp[0][key] = value;
      }else{
        temp[0][key] = String(+value * (gram/oriGram));
      }
    });

    console.log(JSON.parse(JSON.stringify(temp[0])));
    setSelectFood((previtem) => [...previtem,...temp]);
  }

  /** 추가된 음식 리스트와 그래프 */
  useEffect(()=>{
    setSelectFoodView(Array.from(new Set(selectfood)).map((item,idx) =>
      <div key={`key${idx}`} className="h-[30%] xl:h-[35%] w-[95%] p-2 border m-2 rounded-md shadow-md">
        <div className="flex justify-between mb-1 h-[28%] w-[95%]">
          <div className="flex gap-2 border rounded-md w-[80%] mb-1 shadow-inner bg-[#EFEFEF] p-2 text-gray-700">
            <div className="flex items-center text-[80%]">{item["식품명"]}</div>
            <div className="flex items-center text-[80%]">
              <div>{item["섭취량"]+"g"}</div>
            </div>
          </div>
          <div className="flex items-center mb-1"><button onClick={handleDeleteButton} className="hover:bg-[#707070] border w-7 h-7 shadow-md bg-white rounded-[50%] flex justify-center items-center">❌</button></div>
        </div>
        <div className="h-[80%] w-[95%] flex flex-col justify-center border-t">
          <div className="h-[20%] flex justify-center items-center">
            <span className="text-[70%] whitespace-nowrap w-[20%]">칼로리</span>
            <Bar serveMn={+item["섭취량"]} originalServeMn={+item["_1회제공량"]} nutr={+item["칼로리"]} color={"#F7CD01"} isKcal={true}/>
          </div>
          <div className="h-[20%] flex justify-center items-center">
            <span className="text-[70%] whitespace-nowrap w-[20%]">탄수화물</span>
            <Bar serveMn={+item["섭취량"]} originalServeMn={+item["_1회제공량"]} nutr={+item["탄수화물"]} color={"#88CB53"}/>
          </div>
          <div className="h-[20%] flex justify-center items-center">
            <span className="text-[70%] whitespace-nowrap w-[20%]">단백질</span>
            <Bar serveMn={+item["섭취량"]} originalServeMn={+item["_1회제공량"]} nutr={+item["단백질"]} color={"#35abf4"}/>
          </div>
          <div className="h-[20%] flex justify-center items-center">
            <span className="text-[70%] whitespace-nowrap w-[20%]">지방</span>
            <Bar serveMn={+item["섭취량"]} originalServeMn={+item["_1회제공량"]} nutr={+item["지방"]} color={"#F54545"}/>
          </div>
        </div>
      </div>
    ));

    // setShowNutr(Array.from(new Set(selectfood)).map((item,idx) => 
    //   console.log(item)
    // ));
  },[selectfood]);

  /** 디테일 버튼 */
  const handleDetailButton = (e) => {
    
  }

  /** 검색 함수 */
  const handleSearch = (e) => {
    e.preventDefault();
    const search = document.querySelector("#searchfood").value;

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
      <div key={`key${idx}`} className="w-full h-[10%] xl:h-[10%] p-2 border bg-[#efefef] grid grid-cols-2 shadow-inner rounded-lg mb-1 overflow-auto overflow-x-hidden">
        <div className="flex flex-col justify-center border bg-white shadow-inner rounded-md p-2 h-full">
          <div id="foodName" className="w-[70%] text-ellipsis text-gray-700">{item["식품명"]}</div>
          <div className="flex text-sm text-gray-500">
              <div className="text-[90%]">{item["_1회제공량"]+"g"}</div>
              <div className="text-[90%]">&nbsp;{item["칼로리"]+"kcal"}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center justify-items-end h-full p-2">
            <div className="flex items-center">
              <input type="number" id="foodServeMn" defaultValue={item["_1회제공량"]} className="border max-w-[4rem] p-1 rounded-lg"/><span>g&nbsp;</span>
            </div>
            <div className="flex">
              <button onClick={handleCheckButton} className="hover:bg-[#707070] border w-7 h-7 mr-2 text-green-500 shadow-md bg-white rounded-[50%]">✔</button>
              <button onClick={handleDetailButton} className="hover:bg-[#707070] border w-7 h-7 bg-white shadow-md  rounded-[50%]">🔍</button>
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

  /** 자동완성 함수 */
  const handleSearchFood = (e) => {
    console.dir(e);
  }

  /** 저장 함수 */
  const handleSaveButton = () => {
    fetch("http://10.125.121.212:8080/addFood",{
      method : "POST",
      headers : {
        "Authorization" : token
      },
      body : JSON.stringify({
        "date" : day,
        "slot" : slot,
        "dietList" : Array.from(new Set(selectfood)),
        "img" : imageUrl
      })
    })
    .then(res => {
      if(res.status === 200){
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
    setSelectFood("");
  }

  /** 시간대 이동 함수 */
  const handleSlotLeftButton = () => {
    const today = CalToday();
    setSelectSlotIndex(i => i+3);
    navigate(`/user/${today}/${selectSlot}`);

  }

  /** 시간대 이동 함수 */
  const handleSlotRightButton = () => {
    const today = CalToday();
    setSelectSlotIndex(i => i+1);
    navigate(`/user/${today}/${selectSlot}`);
  }

  useEffect(()=>{
    setSelectSlot(slotList[selectSlotIndex%4]);
    // eslint-disable-next-line
  },[selectSlotIndex])

  return (
    <div className="flex flex-col m-auto items-center w-[95%] h-[70rem] ">
      <div className="w-full text-2xl sm:text-3xl h-20 flex justify-center items-center">
        <img src={leftarrow} alt="leftarrow" onClick={handleLeftButton} className="h-full hover:cursor-pointer drop-shadow-md"/>
        <span>{day.slice(0,4)+"년 "+day.slice(4,6)+"월 "+day.slice(6,8)+"일"}</span>
        <img src={rightarrow} alt="rightarrow" onClick={handleRightButton} className="h-full hover:cursor-pointer drop-shadow-md"/>
      </div>
      <div className="flex gap-1 justify-end w-full">
        <button onClick={handleCancelButton} className="border rounded-lg shadow-lg w-24 h-8 mb-2 bg-[#14A8DD] hover:bg-[#3A84F5] text-white">초기화</button>
        <button onClick={handleSaveButton} className="border rounded-lg shadow-lg w-24 h-8 mb-2 bg-[#14A8DD] hover:bg-[#3A84F5] text-white">저장하기</button>
      </div>
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-2 w-full h-[65rem]">
        <div className="border rounded-lg p-2 shadow-lg bg-[#EAEAEA] h-full">
          <nav className="h-[65rem] overflow-hidden">
            <div className="mb-2 w-full relative flex items-center gap-2">
              <input id="searchfood" type="text" name="food" 
              className="w-[98%] p-2 shadow-inner rounded-lg border-b-2" onKeyDown={handleSearchFood} placeholder="음식을 검색하세요"/>
              <button onClick={handleSearch} className="hover:cursor-pointer p-1 w-7 h-7 hover:bg-[#707070] shadow-md bg-white  rounded-[50%] border flex flex-col justify-center items-center">🔍</button>
            </div>
            <div className="border m-1 lg:h-[95%] h-[85%] overflow-scroll overflow-x-hidden bg-white rounded-xl shadow-inner p-2">
              {searchfood}
            </div>
          </nav>
        </div>
        <div className="border h-[65rem] rounded-lg shadow-lg bg-[#EAEAEA] overflow-scroll overflow-x-hidden">
          <div className="h-10 flex justify-between items-center border rounded-lg bg-white shadow-inner m-2">
            <img src={leftarrow} alt="leftarrow" onClick={handleSlotLeftButton} className="h-full hover:cursor-pointer drop-shadow-md"/>
            <div>{selectSlot}</div>
            <img src={rightarrow} alt="rightarrow" onClick={handleSlotRightButton} className="h-full hover:cursor-pointer drop-shadow-md"/>
          </div>
          <div className="grid grid-cols-1 grid-rows-2 gap-1 md:grid-cols-2 p-4 w-full h-full">
            <div>
              <ImgUpload imageUrl={imageUrl} setImageUrl={setImageUrl}/>
            </div>
            <div className="border row-start-2 md:row-start-1 overflow-scroll w-full overflow-x-hidden bg-white rounded-lg shadow-inner">
              {selectfoodView}
            </div>
            <div className="border col-span-2 bg-white shadow-inner rounded-lg">
              <div>
                <div className="grid md:grid-cols-2 gap-4 justify-center items-center p-4">
                  {showNutr}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User