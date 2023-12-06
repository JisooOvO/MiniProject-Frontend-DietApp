import { useEffect, useState } from "react";
import BarContainer from "../BarContainer";
import FoodDetailHeader from "./FoodDetailHeader";
import { information } from "./foodDeatilInformationArray"

const FoodDetailInfo = ({ targetFood }) => {
  const [servingSize, setServingSize] = useState("");
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
      document.removeEventListener("mousemove", mouseMoveHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler, { once: true });
  };

  const handleExit = () => {
    const detailContainer = document.querySelector("#detailContainer");
    setServingSize("");
    setShowServingSize("");
    detailContainer.classList.add("hidden");
  };

  const handleDetailGramChange = (e) => {
    setServingSize(e.target.valueAsNumber);
  };

  useEffect(() => {
    setServingSize(targetFood[0]["serving_size"]);
  }, [targetFood]);

  useEffect(() => {
    setShowServingSize(
      <input type="number" onChange={handleDetailGramChange} className="border rounded-md shadow-inner text-end max-w-[5rem]" defaultValue={servingSize} id="DetailServingSize"/>
    );
  }, [servingSize]);

  return (
    <div id="modal" onMouseDown={handleMouseDown} style={{   transform: `translateX(${x}px) translateY(${y}px)`, }} className="absolute lg:top-[20rem] top-48 left-[2rem] z-50 rounded-lg shadow-lg p-2 border w-[25rem] h-[25rem] sm:w-[35rem] sm:h-[40rem] bg-[#14A8DD]">
      <FoodDetailHeader targetFood={targetFood} servingSize={servingSize} showServingSize={showServingSize} handleExit={handleExit}/>
      <div className="border text-[50%] sm:text-[100%] rounded-md shadow-inner bg-white mt-4 h-[85%] p-2">
        {
          information.map((item,idx) => <BarContainer key={`key${idx}`} name={item[0]} nutr={targetFood[0][item[1]] * (+servingSize / targetFood[0]["serving_size"])} color={item[2]} unit={item[3]} type={item[4]} />)
        }
      </div>
    </div>
  );
};

export default FoodDetailInfo;
