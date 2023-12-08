import TargetInput from "./TargetInput"

const TargetCalAndWeight = ({setTargetCal,setTargetWeight}) => {
  return (
    <div className="flex justify-end w-full gap-4 mb-2">
        <TargetInput title={"목표 칼로리"} unit={"kcal"} setTarget={setTargetCal} type={"k"}/>
        <TargetInput title={"목표 몸무게"} unit={"kg"} setTarget={setTargetWeight} type={"w"}/>
    </div>
  )
}

export default TargetCalAndWeight