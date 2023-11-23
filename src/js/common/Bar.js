const Bar = ({nutr, color, isKcal=false, unit, type}) => {
  let BarWidth = nutr;

  if(isKcal){
    BarWidth = nutr / 20;
  }
  
  switch(type){
    case "탄" : BarWidth = nutr / 130 * 100; break;
    case "단" : BarWidth = nutr / 60 * 100; break;
    case "지" : BarWidth = nutr / 50 * 100; break;
    case "당" : BarWidth = nutr / 37.5 * 100; break;
    case "식이" : BarWidth = nutr / 38 * 100; break;
    case "트랜스" : BarWidth = nutr / 2.2 * 100; break;
    case "포화" : BarWidth = nutr / 15 * 100; break;
    case "나트륨" : BarWidth = nutr / 2000 * 100; break;
    case "콜레스테롤" : BarWidth = nutr / 300 * 100; break;
    case "칼슘" : BarWidth = nutr / 750 * 100; break;
    case "비타민B1" : BarWidth = nutr / 1.2 * 100; break;
    case "비타민B2" : BarWidth = nutr / 1.5 * 100; break;
    case "비타민B12" : BarWidth = nutr / 3 * 100; break;
    case "비타민C" : BarWidth = nutr / 100 * 100; break;
  }
  const dynamicStyle = { 
    width: `${BarWidth}%`,
    backgroundColor : `${color}` 
};

  return (
    <div className="border h-[70%] w-[70%] relative rounded-md overflow-hidden">
        <div className="absolute z-10 right-2 text-[80%] top-[50%] translate-y-[-50%]">{nutr.toFixed(2)}{unit}</div>
        <span className="border absolute h-full left-[5%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[10%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[15%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[20%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[25%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[30%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[35%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[40%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[45%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[50%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[55%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[60%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[65%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[70%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[75%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[80%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[85%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[90%] w-[0.1rem]"></span>
        <span className="border absolute h-full left-[95%] w-[0.1rem]"></span>
        <div style={dynamicStyle} className="h-full rounded-md border"></div>
    </div>
  )
}

export default Bar