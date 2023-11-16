import { useEffect, useState } from "react";
import "../style/foodList.css"

const FoodLists = ({FoodList}) => {
  /**
   * //멤버아이디 : 토큰
   * DESC_KOR : 식품명
   * NUTR_CONT1 : 칼로리
   * NUTR_CONT2 : 탄수화물
   * NUTR_CONT3 : 단백질
   * NUTR_CONT4 : 지방
   * NUTR_CONT5 : 당류
   * NUTR_CONT6 : 나트륨
   * NUTR_CONT7 : 콜레스테롤
   * NUTR_CONT8 : 포화지방산
   * NUTR_CONT9 : 트랜스지방산
   * SERVING_WT : 1회 제공량
   * 아침점심저녁간식
   * 식단기록날짜
   */


  const [addView,setAddView] = useState();
  const [nutr, setNutr] = useState([]);
  const [add, setAdd] = useState([]);

  const renderingSelectView = (key,val) => {
    if(!val) return;
    for(let i of add){
      if(i[0] === key) return;
    }
    setAdd(add => [...add,val]);
  }

  const handleDetailButton = () =>{
    console.log("hi");
  }

  useEffect(()=>{
    console.log(add);
    setAddView(add.map((item,idx) => 
        <div key={`key${idx}`} className="w-full px-1 border flex justify-between items-center border-slate-900">
          <div>
            <div className="text-sm ">{item[0]}</div>
            <div className="text-sm">{item[1]}g, {item[2]}kcal</div>
          </div>
          <div className="hover:cursor-pointer">❌</div>
        </div>
    ));
  },[add])

  const handleAddButton = (e) => {
    let target = e.target.closest('#selectFood').childNodes[0].childNodes;
    target = Array.from(target).filter(item => item.id !== "notUsed").map(item => item.innerHTML);
    renderingSelectView(target[0],[...target]);
  }

  const handleSelectFood = (e) => {
    let target = e.target.closest('#selectFood');
    let relativedtarget = e.target.closest("#allFoodList");
 
    //배경 포커스
    if(relativedtarget) Array.from(relativedtarget.childNodes).map(item => item.classList.remove("selectedFood"));
    if(target) target.classList.toggle("selectedFood");
  }


  const view = FoodList.map((item,idx)=>
    <div id="selectFood" className="w-full px-1 border flex justify-between items-center border-slate-900 hover:cursor-pointer" onClick={handleSelectFood} key={`key${idx}`}>
      <div className="w-[70%]">
        <div className="text-sm ">{item.DESC_KOR}</div>
        <div id="notUsed" className="text-sm">{item.SERVING_WT}g, {item.NUTR_CONT1}kcal</div>
        <span className="hidden">{item.SERVING_WT}</span>
        <span className="hidden">{item.NUTR_CONT1}</span>
        <span className="hidden">{item.NUTR_CONT2}</span>
        <span className="hidden">{item.NUTR_CONT3}</span>
        <span className="hidden">{item.NUTR_CONT4}</span>
        <span className="hidden">{item.NUTR_CONT5}</span>
        <span className="hidden">{item.NUTR_CONT6}</span>
        <span className="hidden">{item.NUTR_CONT7}</span>
        <span className="hidden">{item.NUTR_CONT8}</span>
        <span className="hidden">{item.NUTR_CONT9}</span>
      </div>
      <div className="flex flex-row-reverse gap-1">
        <div onClick={handleDetailButton} className="hover:cursor-pointer bg-white text-sm rounded-md shadow-md border">🔍</div>
        <div onClick={handleAddButton} className="hover:cursor-pointer text-sm z-1 bg-white rounded-md shadow-md"> ✔ </div> 
      </div>
    </div>    
  );

  return (
    <div className="flex h-1/3 w-full">
      <div id="allFoodList" className="h-full overflow-scroll border bg-[#f1f1f1] overflow-x-hidden w-1/3">
        {view}
      </div>
      <div className="w-[50%]">
        <div className="border h-[47%]">통계</div>
        <div><span>아침점심저녁간식</span></div>
        <div className="overflow-scroll h-1/2 overflow-x-hidden">{addView}</div>
      </div>
    </div>
  )
}

export default FoodLists;