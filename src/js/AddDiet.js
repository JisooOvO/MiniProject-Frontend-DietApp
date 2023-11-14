import { useEffect, useState } from "react";
import FoodLists from "./FoodLists"

const AddDiet = () => {
  let searchFood;
  const [FoodList,setFoodList] = useState([]);
  let url = `https://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1?`
  url = url + `ServiceKey=${process.env.REACT_APP_SERVICE_KEY}`
  url = url + `&type=json&numOfRows=20`

  const handleSearchFood = (e) => {
    searchFood = e.target.value;
  } 

  const handleSearch = (e) => {
    e.preventDefault();
    let nurl = url + `&desc_kor=${searchFood}`
    console.log(nurl)

    fetch(nurl)
    .then(res => res.json())
    .then(data => {
      setFoodList(data.body.items);
    })
    .catch(e => console.log(e))  

  }

  useEffect(()=>{
    console.log(FoodList);
  },[FoodList])

  return (
    <div>
        <div className="flex gap-4">
          <div>
            <form action="#">
                <input type="text" name="food" onKeyDown={handleSearchFood} placeholder="음식"/>
                <input type="submit" onClick={handleSearch} className="hover:cursor-pointer" value={"검색"}/>
            </form>
            { FoodList ? <FoodLists FoodList={FoodList}/> : <div>검색 조건에 맞는 아이템이 없습니다</div> }
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