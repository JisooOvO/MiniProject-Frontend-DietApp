const FoodDetailHeader = ({targetFood,servingSize,showServingSize,handleExit}) => {
  return (
    <div className="flex justify-between h-[10%]">
        <div className="border flex justify-between items-center h-full whitespace-nowrap bg-white shadow-inner w-[80%] rounded-md text-[50%] sm:text-[100%] py-2 px-4">
            <p className="drop-shadow-md"> {targetFood[0]["foodname"]} &nbsp; {servingSize !== "" ? ( targetFood[0]["kcal"] * (+servingSize / targetFood[0]["serving_size"]) ).toFixed(2) : 0 }kcal</p>
            <div> 
                {showServingSize}
                <span>g</span>
            </div>
        </div>
        <button onClick={handleExit} className="border rounded-[50%] w-7 h-7 shadow-md bg-white hover:bg-[#707070]">❌</button>
    </div>
  )
}

export default FoodDetailHeader