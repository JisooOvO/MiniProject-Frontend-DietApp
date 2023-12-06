import Bar from "./Bar"

const SelectFoodView = ({item,idx,handleDeleteButton}) => {
  return (
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
            <Bar nutr={+item["carbohydrate"]} color={"#88CB53"} unit={"g"} type={"탄"} />
        </div>
        <div className="h-[20%] flex gap-2 items-center">
            <span className="text-[80%] whitespace-nowrap w-[20%] text-center">단백질</span>
            <Bar nutr={+item["protein"]} color={"#35abf4"} unit={"g"} type={"단"} />
        </div>
        <div className="h-[20%] flex gap-2 items-center">
            <span className="text-[80%] whitespace-nowrap w-[20%] text-center">지방</span>
            <Bar nutr={+item["fat"]} color={"#F54545"} unit={"g"} type={"지"} />
        </div>
        </div>
    </div>
  )
}

export default SelectFoodView