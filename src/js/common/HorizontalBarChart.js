import { useParams } from "react-router-dom";

const HorizontalBarChart = ({title,unit,userData,recommendData}) => {
  const slot = useParams().slot;
  let ratio = userData/recommendData * 100;
  let RecommendRatio = 100;

  if(ratio >= 100) {
    ratio = 100;
    RecommendRatio = recommendData/userData * 100;
  }
   
  const dynamicStyle = {
    width : `${ratio}%`
  }
  return (
    <div className="w-[100%]">
      <p className="text-lg font-extrabold">{title}</p>
      <div className="w-[100%] mt-1 flex flex-col gap-2
      border p-4 rounded-md shadow-inner">
          <span>일일 권장 섭취 {title}</span>
          <div style={{width : `${RecommendRatio}%`}} className="bg-blue-500 w-full rounded-md text-end p-2">{recommendData.toFixed(2)}{unit}</div>
          <span>{slot}에 섭취한 {title}</span>
          <div style={dynamicStyle} className="bg-green-400 rounded-md text-end p-2">{userData.toFixed(2)}{unit}</div>
      </div>
    </div>
  )
}

export default HorizontalBarChart