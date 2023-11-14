import { useEffect, useState } from "react";
import FetchFood from "./FetchFood"

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
    <div className="ml-[26%]">
        <form action="#">
            <input type="text" name="food" onKeyDown={handleSearchFood} placeholder="음식"/>
            <input type="submit" onClick={handleSearch} className="hover:cursor-pointer" value={"검색"}/>
        </form>
        { FoodList ? <FetchFood FoodList={FoodList}/> : <div>hi</div> }
    </div>
  )
}

export default AddDiet