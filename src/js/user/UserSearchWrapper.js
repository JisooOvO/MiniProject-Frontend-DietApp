import UserSeachContainer from "./UserSeachContainer"

const UserSearchWrapper = ({setSearchFood,setIsLoading,setSearchFoodList,token,fastSearch,setFastSearch,searchfood}) => {
  return (
    <div id="toggleContainer" className="border rounded-lg p-2 shadow-lg bg-[#EAEAEA] h-[30rem] xl:h-[70rem]">
        <UserSeachContainer setSearchFood={setSearchFood} setIsLoading={setIsLoading} setSearchFoodList={setSearchFoodList} token={token} fastSearch={fastSearch} setFastSearch={setFastSearch}/>
        <div className="border m-1 xl:h-[95%] h-[88%] bg-white rounded-xl shadow-inner p-2 overflow-scroll overflow-x-hidden">
          {searchfood}
        </div>
    </div>
  )
}

export default UserSearchWrapper