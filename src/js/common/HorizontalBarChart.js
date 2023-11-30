import { useParams } from "react-router-dom";

const HorizontalBarChart = ({title,unit,userData,recommendData}) => {
  const slot = useParams().slot;
  let ratio = userData/recommendData * 100;
  let RecommendRatio = 100;

  if(userData === 0){
    ratio = 0;
  }

  if(ratio >= 100) {
    ratio = 100;
    RecommendRatio = recommendData/userData * 100;
  }
   
  const dynamicStyle = {
    width : `${ratio}%`
  }
  return (
    <div className="w-[100%]">
      <p className="font-extrabold drop-shadow-md">🔎 {title}</p>
      <div className="w-[100%] mt-1 flex flex-col gap-2 border p-4 rounded-md shadow-inner">
          <span className="text-sm">🎯 일일 권장 섭취 {title}</span>
          <div className="relative border rounded-md shadow-inner">
            <div className="absolute right-2 top-[50%] translate-y-[-50%] text-sm">{recommendData? recommendData.toFixed(2) : 0}{unit}</div>
            <div style={{width : `${RecommendRatio}%`}} className="bg-blue-500 w-full h-8 rounded-md"></div>
          </div>
          <span className="text-sm">📊 {slot}에 섭취한 {title}</span>
          <div className="relative border rounded-md shadow-inner">
            <div className="absolute right-2 top-[50%] translate-y-[-50%] text-sm">{userData ? userData.toFixed(2) : 0}{unit}</div>
            <div style={dynamicStyle} className="bg-green-400 rounded-md h-8"></div>
          </div>
      </div>
    </div>
  )
}

export default HorizontalBarChart