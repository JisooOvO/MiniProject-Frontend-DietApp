const TotalNutrientBar = ({title,recommendData,userDataMorning = 0,userDataLunch = 0,userDataDinner = 0,unit}) => {
  const userData = userDataMorning + userDataLunch + userDataDinner;
  let ratio = userData/recommendData * 100;
  let ratioM = userDataMorning/recommendData * 100;
  let ratioL = userDataLunch/recommendData * 100;
  let ratioD = userDataDinner/recommendData * 100;
  let RecommendRatio = 100;

  if(ratio >= 100) {
    ratio = 100;
    RecommendRatio = recommendData/userData * 100;
  }
   
  const dynamicStyleM = {
    width : `${ratioM}%`
  }

  const dynamicStyleL = {
    width : `${ratioL}%`
  }

  const dynamicStyleD = {
    width : `${ratioD}%`
  }

  const handleMouseOver = (e) => {
    if (e.target.nodeName === "SPAN") return;
    e.target.childNodes[0].classList.remove("hidden");
  }

  const handleMouseOut = (e) => {
    if (e.target.nodeName === "SPAN") return;
    e.target.childNodes[0].classList.add("hidden");
  }

  return (
    <div className="w-[100%] mt-1 flex flex-col gap-2 border p-4 rounded-md shadow-inner bg-white justify-center">
      <span className="text-sm">🎯 일일 권장 섭취 {title}</span>
      <div className="relative border rounded-md shadow-inner">
      <div className="absolute right-2 top-[50%] translate-y-[-50%] text-sm flex justify-center items-center">{recommendData.toFixed(2)}{unit}</div>
      <div style={{width : `${RecommendRatio}%`}} className="bg-blue-500 w-full h-8 rounded-md"></div>
      </div>
      <span className="text-sm">📊 오늘 섭취한 {title}</span>
      <div className="relative">
        <div className="absolute right-2 h-full top-[50%] translate-y-[-50%] text-sm flex justify-center items-center">{userData ? userData.toFixed(2) : 0}{unit}</div>
        <div className="flex border rounded-md shadow-inner h-8">
          <div style={dynamicStyleM} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="bg-green-400 h-full rounded-l-md">
            <span className="hidden text-sm text-gray-700 absolute top-8 whitespace-nowrap z-20">{"아침 : "}{userDataMorning}{unit}</span>
          </div>
          <div style={dynamicStyleL} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="bg-green-500 h-full ">
            <span className="hidden text-sm text-gray-700 absolute top-8 whitespace-nowrap z-20">{"점심 : "}{userDataLunch}{unit}</span>
          </div>
          <div style={dynamicStyleD} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="bg-green-600 h-full rounded-r-md">
            <span className="hidden text-sm text-gray-700 absolute top-8 whitespace-nowrap z-20">{"저녁 : "}{userDataDinner}{unit}</span>
          </div>
        </div>
      </div>
  </div>
  )
}

export default TotalNutrientBar