const FetchFood = ({FoodList}) => {

  const handleSelectFood = (e) => {
    console.log(e.target.innerText);
  }

  const view = FoodList.map((item,idx)=>
    <li onClick={handleSelectFood} key={`key${idx}`}>{item.DESC_KOR}</li>
  )
  return (
    <div>
      {view}
    </div>
  )
}

export default FetchFood