import Bar from "./Bar"

const FoodDetailBar = ({name,nutr,color,unit,type}) => {
  return (
    <div className="h-[7%] flex justify-between items-center">
        <div className="drop-shadow-md">{name}</div>
        <Bar nutr={nutr} color={color} unit={unit} type={type}/>
  </div>
  )
}

export default FoodDetailBar