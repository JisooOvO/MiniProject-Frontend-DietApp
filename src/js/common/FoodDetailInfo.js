const FoodDetailInfo = () => {
  const handleExit = () => {
    const detailContainer = document.querySelector("#detailContainer");
    detailContainer.classList.add("hidden");
  }

  return (
    <div
    className="absolute top-[50%] left-[50%] z-50 translate-x-[-50%] rounded-lg shadow-lg p-2
    translate-y-[-70%] border w-[18rem] h-[25rem] sm:w-[35rem] sm:h-[30rem] bg-[#14A8DD]">
        <div className="flex justify-between h-[10%]">
            <div className="border flex items-center h-full whitespace-nowrap bg-white shadow-inner w-[80%] rounded-md text-[80%] p-2">음식이름</div>
            <button onClick={handleExit}
            className="border rounded-[50%] w-7 h-7 shadow-md bg-white hover:bg-[#707070]">❌</button>
        </div>
        <div className="border rounded-md shadow-inner bg-white mt-4 h-[85%]">
            히히
        </div>
    </div>
  )
}

export default FoodDetailInfo