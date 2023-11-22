const HorizontalBarChart = ({recommendData,userData}) => {
  //console.log(recommendData,userData);
  const dynamicStyle = {
    width : `50%`
  }
  return (
    <div className="w-[100%]">
      <p>항목이름</p>
      <div className="w-[100%] mt-1 flex flex-col gap-2
      border p-4 rounded-md shadow-inner">
          <span>항목이름</span><div className="bg-blue-500 w-full rounded-md text-end p-2">{recommendData["총 kcal"].toFixed(2)}</div>
          <span>항목이름</span><div style={dynamicStyle} className="bg-green-400 rounded-md text-end p-2">{userData.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default HorizontalBarChart