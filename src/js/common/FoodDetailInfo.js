import FoodDetailBar from "./FoodDetailBar";

const FoodDetailInfo = ({targetFood}) => {
  console.log(targetFood)
  const handleExit = () => {
    const detailContainer = document.querySelector("#detailContainer");
    detailContainer.classList.add("hidden");
  }

  return (
    <div
    className="absolute top-[30rem] sm:top-[35rem] md:top-[45rem] lg:top-[40rem] left-[50%] z-50 translate-x-[-50%] rounded-lg shadow-lg p-2
    translate-y-[-70%] border w-[18rem] h-[25rem] sm:w-[35rem] sm:h-[40rem] bg-[#14A8DD]">
        <div className="flex justify-between h-[10%]">
            <div className="border flex justify-between items-center h-full whitespace-nowrap
             bg-white shadow-inner w-[80%] rounded-md text-[50%] sm:text-[100%] p-2">
              <p className="drop-shadow-md">
                {targetFood[0]["food_name"]}&nbsp;
                {targetFood[0]["serving_size"]+"g"}&nbsp;
                {targetFood[0]["kcal"]+"kcal"}
              </p>
            </div>
            <button onClick={handleExit}
            className="border rounded-[50%] w-7 h-7 shadow-md bg-white hover:bg-[#707070]">❌</button>
        </div>
        <div className="border text-[50%] sm:text-[100%] rounded-md shadow-inner bg-white mt-4 h-[85%] p-2">
            <FoodDetailBar 
            name={"탄수화물"} nutr={targetFood[0]["carbohydrate"]} color={"#88CB53"} unit={"g"} type={"탄"}/>
            <FoodDetailBar 
            name={"단백질"} nutr={targetFood[0]["protein"]} color={"#35ABF4"} unit={"g"} type={"단"}/>
            <FoodDetailBar 
            name={"지방"} nutr={targetFood[0]["fat"]} color={"#F7CD01"} unit={"g"} type={"지"}/>
          <FoodDetailBar 
            name={"당류"} nutr={targetFood[0]["sugars"]} color={"#F7C0C3"} unit={"g"} type={"당"}/>
          <FoodDetailBar 
            name={"식이섬유"} nutr={targetFood[0]["fiber"]} color={"#D6C49F"} unit={"g"} type={"식이"}/>
          <FoodDetailBar 
            name={"트랜스지방"} nutr={targetFood[0]["trans_fat"]} color={"#5F4727"} unit={"g"} type={"트랜스"}/>
          <FoodDetailBar 
            name={"포화지방"} nutr={targetFood[0]["saturated_fat"]} color={"#D26C7E"} unit={"g"} type={"포화"}/>
          <FoodDetailBar 
            name={"나트륨"} nutr={targetFood[0]["sodium"]} color={"#F68100"} unit={"mg"} type={"나트륨"}/>
          <FoodDetailBar 
            name={"콜레스테롤"} nutr={targetFood[0]["cholesterol"]} color={"#E14935"} unit={"mg"} type={"콜레스테롤"}/>
          <FoodDetailBar 
            name={"칼슘"} nutr={targetFood[0]["calcium"]} color={"#97C3D9"} unit={"mg"} type={"칼슘"}/>
          <FoodDetailBar 
            name={"비타민B1"} nutr={targetFood[0]["vita_b1"]} color={"#ECB4B2"} unit={"mg"} type={"비타민B1"}/>
          <FoodDetailBar 
            name={"비타민B2"} nutr={targetFood[0]["vita_b2"]} color={"#ECB4B2"} unit={"mg"} type={"비타민B2"}/>
          <FoodDetailBar 
            name={"비타민B12"} nutr={targetFood[0]["vita_b12"]} color={"#ECB4B2"} unit={"µg"} type={"비타민B12"}/>
          <FoodDetailBar 
            name={"비타민C"} nutr={targetFood[0]["vita_c"]} color={"#D5B702"} unit={"mg"} type={"비타민C"}/>
        </div>
    </div>
  )
}

export default FoodDetailInfo