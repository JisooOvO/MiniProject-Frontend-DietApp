import { useEffect, useState } from "react";
import FoodDetailBar from "./FoodDetailBar";

const FoodDetailInfo = ({targetFood}) => {
  const [servingSize,setServingSize] = useState('');
  const [showServingSize, setShowServingSize] = useState();
  const [{ x, y }, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseDown = (m) => {
    const mouseMoveHandler = (e) => {
      const deltaX = e.screenX - m.screenX;
      const deltaY = e.screenY - m.screenY;

      setPosition({
          x: x + deltaX,
          y: y + deltaY,
      });
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, { once: true });
  }

  const handleExit = () => {
    const detailContainer = document.querySelector("#detailContainer");
    setServingSize('');
    setShowServingSize('');
    detailContainer.classList.add("hidden");
  }

  const handleDetailGramChange = (e) => {
    setServingSize(e.target.valueAsNumber);
  }

  useEffect(()=>{
    setServingSize(targetFood[0]["serving_size"])
  },[targetFood])

  useEffect(()=>{
    setShowServingSize(
      <input type="number" onChange={handleDetailGramChange}
      className="border rounded-md shadow-inner text-end w-[5rem]"
      defaultValue={servingSize} id="DetailServingSize"/>
    )
  },[servingSize])

  return (
    <div id="modal" onMouseDown={handleMouseDown} 
    style={{ 
      transform: `translateX(${x}px) translateY(${y}px)`,
    }}
    className="absolute lg:top-[20rem] top-48 left-[2rem] z-50 rounded-lg shadow-lg p-2
     border w-[16rem] h-[25rem] sm:w-[25rem] sm:h-[40rem] bg-[#14A8DD]">
        <div className="flex justify-between h-[10%]">
            <div className="border flex justify-between items-center h-full whitespace-nowrap
             bg-white shadow-inner w-[80%] rounded-md text-[50%] sm:text-[100%] p-2">
              <p className="drop-shadow-md">
                {targetFood[0]["foodname"]}
                &nbsp;
                { servingSize !== '' ? (targetFood[0]["kcal"]* (+servingSize/targetFood[0]["serving_size"])).toFixed(2) : 0 }
                kcal
              </p>
              <div>
                {showServingSize}
                <span>g</span>
              </div>
            </div>
            <button onClick={handleExit}
            className="border rounded-[50%] w-7 h-7 shadow-md bg-white hover:bg-[#707070]">❌</button>
        </div>
        <div className="border text-[50%] sm:text-[100%] rounded-md shadow-inner bg-white mt-4 h-[85%] p-2">
            <FoodDetailBar 
            name={"탄수화물"} nutr={targetFood[0]["carbohydrate"] * (+servingSize/targetFood[0]["serving_size"])} color={"#88CB53"} unit={"g"} type={"탄"}/>
            <FoodDetailBar 
            name={"단백질"} nutr={targetFood[0]["protein"] * (+servingSize/targetFood[0]["serving_size"])} color={"#35ABF4"} unit={"g"} type={"단"}/>
            <FoodDetailBar 
            name={"지방"} nutr={targetFood[0]["fat"] * (+servingSize/targetFood[0]["serving_size"])} color={"#F7CD01"} unit={"g"} type={"지"}/>
          <FoodDetailBar 
            name={"당류"} nutr={targetFood[0]["sugars"] * (+servingSize/targetFood[0]["serving_size"])} color={"#F7C0C3"} unit={"g"} type={"당"}/>
          <FoodDetailBar 
            name={"식이섬유"} nutr={targetFood[0]["fiber"] * (+servingSize/targetFood[0]["serving_size"])} color={"#D6C49F"} unit={"g"} type={"식이"}/>
          <FoodDetailBar 
            name={"트랜스지방"} nutr={targetFood[0]["trans_fat"] * (+servingSize/targetFood[0]["serving_size"])} color={"#5F4727"} unit={"g"} type={"트랜스"}/>
          <FoodDetailBar 
            name={"포화지방"} nutr={targetFood[0]["saturated_fat"] * (+servingSize/targetFood[0]["serving_size"])} color={"#D26C7E"} unit={"g"} type={"포화"}/>
          <FoodDetailBar 
            name={"나트륨"} nutr={targetFood[0]["sodium"] * (+servingSize/targetFood[0]["serving_size"])} color={"#F68100"} unit={"mg"} type={"나트륨"}/>
          <FoodDetailBar 
            name={"콜레스테롤"} nutr={targetFood[0]["cholesterol"] * (+servingSize/targetFood[0]["serving_size"])} color={"#E14935"} unit={"mg"} type={"콜레스테롤"}/>
          <FoodDetailBar 
            name={"칼슘"} nutr={targetFood[0]["calcium"] * (+servingSize/targetFood[0]["serving_size"])} color={"#97C3D9"} unit={"mg"} type={"칼슘"}/>
          <FoodDetailBar 
            name={"마그네슘"} nutr={targetFood[0]["magnesium"] * (+servingSize/targetFood[0]["serving_size"])} color={"#7A786C"} unit={"mg"} type={"마그네슘"}/>
          <FoodDetailBar 
            name={"비타민B1"} nutr={targetFood[0]["vita_b1"] * (+servingSize/targetFood[0]["serving_size"])} color={"#ECB4B2"} unit={"mg"} type={"비타민B1"}/>
          <FoodDetailBar 
            name={"비타민B2"} nutr={targetFood[0]["vita_b2"] * (+servingSize/targetFood[0]["serving_size"])} color={"#ECB4B2"} unit={"mg"} type={"비타민B2"}/>
          <FoodDetailBar 
            name={"비타민B12"} nutr={targetFood[0]["vita_b12"] * (+servingSize/targetFood[0]["serving_size"])} color={"#ECB4B2"} unit={"µg"} type={"비타민B12"}/>
          <FoodDetailBar 
            name={"비타민C"} nutr={targetFood[0]["vita_c"] * (+servingSize/targetFood[0]["serving_size"])} color={"#D5B702"} unit={"mg"} type={"비타민C"}/>
        </div>
    </div>
  )
}

export default FoodDetailInfo