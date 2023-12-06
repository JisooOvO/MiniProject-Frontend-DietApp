const ChartContainer = ({dateState,handleDateChange,date,today,showChart}) => {
  return (
    <div className="w-full border p-4 h-[42rem] shadow-2xl rounded-md">
    <div className="text-center mt-4 h-16 text-xl sm:text-3xl drop-shadow-md">2주 간 칼로리 & 몸무게 변화</div>
      <p className="text-gray-500 text-[70%] sm:text-sm flex justify-end">기준 일자 기준, 일주일 전·후의 기록을 검색 할 수 있습니다.</p>
      <form className="flex relative justify-end items-center gap-7 mb-2">
        <div>기준 일자 :</div>
        <label htmlFor="date2" className="border w-32 text-center rounded-md shadow-inner p-1">{dateState}</label>
        <input type="date" id="date2" onChange={handleDateChange} ref={date} defaultValue={today} className="border absolute top-0 right-0 opacity-0"/>
      </form>
    <div className="border p-2 rounded-md shadow-inner">{showChart}</div>
  </div>
  )
}

export default ChartContainer