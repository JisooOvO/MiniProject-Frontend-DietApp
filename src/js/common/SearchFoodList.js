import { useEffect } from "react";
const SearchFoodList = ({ item, idx, favoriteList, handleAddFavoritesButton, handleCheckButton, handleDetailButton }) => {
  useEffect(() => {
    const favoriteButtons = document.querySelectorAll("#favoriteButton");
    if (favoriteList && favoriteList.includes(item["foodname"])) {
      favoriteButtons[idx].classList.remove("text-slate-400");
      favoriteButtons[idx].classList.add("text-yellow-300")
    }
  }, [favoriteList])
  return (
    <div key={`key${idx}`} className="w-full h-[30%] lg:h-[20%] xl:h-[10%] p-2 border bg-[#efefef] grid grid-cols-2 shadow-inner rounded-lg mb-1">
      <div className="flex flex-col justify-center border h-[90%] bg-white rounded-md p-2">
        <div id="food_name" className="w-[70%] text-ellipsis drop-shadow text-[80%] md:text-[100%] text-gray-700">{item["foodname"]}</div>
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
          <div className="relative">
            <span id="favoriteBtt" className="text-sm hidden absolute -top-4 -left-2 whitespace-nowrap">즐겨찾기</span>
            <button id="favoriteButton"
              onClick={handleAddFavoritesButton}
              onMouseEnter={() => {
                const favoriteBtt = document.querySelectorAll("#favoriteBtt");
                favoriteBtt[idx].classList.remove("hidden");
              }}
              onMouseLeave={() => {
                const favoriteBtt = document.querySelectorAll("#favoriteBtt");
                favoriteBtt[idx].classList.add("hidden");
              }}
              className="hover:bg-[#707070] border w-7 h-7 mr-2 shadow-md bg-white rounded-[50%] text-slate-400">★</button>
          </div>
          <div className="relative">
            <span id="addBt" className="text-sm hidden absolute -top-4 -left-2 whitespace-nowrap">추가하기</span>
            <button onClick={handleCheckButton}
              onMouseEnter={() => {
                const addBt = document.querySelectorAll("#addBt");
                addBt[idx].classList.remove("hidden");
              }}
              onMouseLeave={() => {
                const addBt = document.querySelectorAll("#addBt");
                addBt[idx].classList.add("hidden");
              }}
              className="hover:bg-[#707070] border w-7 h-7 mr-2 text-green-500 shadow-md bg-white rounded-[50%]">✔</button>
          </div>
          <div className="relative">
            <span id="detailBt" className="text-sm hidden absolute -top-4 -left-2 whitespace-nowrap">상세보기</span>
            <button onClick={handleDetailButton}
              onMouseEnter={() => {
                const detailBt = document.querySelectorAll("#detailBt");
                detailBt[idx].classList.remove("hidden");
              }}
              onMouseLeave={() => {
                const detailBt = document.querySelectorAll("#detailBt");
                detailBt[idx].classList.add("hidden");
              }}
              className="hover:bg-[#707070] border w-7 h-7 bg-white shadow-md  rounded-[50%]">🔍</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchFoodList