const Bar = ({nutr, color, isKcal=false, unit, type}) => {
  let BarWidth = nutr;

  if(isKcal){
    BarWidth = nutr / 2000 * 100;
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
    default : BarWidth = nutr / 2000 * 100;
  }

  const dynamicStyle = { 
    width: `${BarWidth}%`,
    backgroundColor : `${color}` 
  };

  let arr = []
  for (let i = 5 ; i < 100 ; i=i+5){
    arr.push(i);
  }

  console.log(arr);

  return (
    <div className="border h-[70%] w-[70%] relative rounded-md overflow-hidden">
        <div className="absolute z-10 right-2 text-[80%] top-[50%] translate-y-[-50%]">{nutr ? nutr.toFixed(2) : 0}{unit}</div>
        {arr.map((item,idx) => <span key={`key${idx}`} style={{left : item + "%"}} className={`border absolute h-full w-[0.1rem]`}></span> )}
        <div style={dynamicStyle} className="h-full rounded-md border"></div>
    </div>
  )
}

export default Bar