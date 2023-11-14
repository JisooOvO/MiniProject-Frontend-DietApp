import { useState } from "react";
import FoodLists from "./FoodLists"

const AddDiet = () => {
  let searchFood;
  const [isNot_SearchFood,stateIsNot_SearchFood] = useState();
  const [FoodList,setFoodList] = useState();
  let url = `https://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1?`
  url = url + `ServiceKey=${process.env.REACT_APP_SERVICE_KEY}`
  url = url + `&type=json&numOfRows=20`

  const handleSearchFood = (e) => {
    searchFood = e.target.value;
  } 

  const handleSearch = (e) => {
    e.preventDefault();
    if(!searchFood) return;
    let nurl = url + `&desc_kor=${searchFood}`
    stateIsNot_SearchFood(false);
    fetch(nurl)
    .then(res => res.json())
    .then(data => {
      if(data.body.totalCount === 0) 
        stateIsNot_SearchFood(true);
      setFoodList(data.body.items);
      console.log(isNot_SearchFood, FoodList)
    })
    .catch(e => console.log(e))  

  }

  return (
    <div>
        <div className="flex gap-4">
          <div>
            <form action="#">
                <input type="text" name="food" onKeyDown={handleSearchFood} placeholder="음식"/>
                <input type="submit" onClick={handleSearch} className="hover:cursor-pointer" value={"검색"}/>
            </form>
            { !isNot_SearchFood ? "" : <p>조건에 해당하는 항목이 존재하지 않습니다</p> }
            { FoodList ? <FoodLists FoodList={FoodList}/> : "" }
          </div>
          <div>
            <div>영양성분표시</div>
            <div>추가된아이템</div>
          </div>
        </div>
    </div>
  )
}

export default AddDiet