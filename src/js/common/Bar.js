const Bar = ({nutr, color, isKcal=false}) => {
  let BarWidth = nutr;
  let unit;

  if(isKcal){
    unit = "kcal";
    BarWidth = BarWidth / 20;
  }else{ 
    unit = "g";
    BarWidth = BarWidth / 5;
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