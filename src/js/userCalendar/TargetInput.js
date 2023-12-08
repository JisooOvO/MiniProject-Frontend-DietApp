import { useRef } from "react";

const TargetInput = ({title, unit, setTarget, type}) => {
  let innerWidth = window.innerWidth;

  let defaultV = 0;
  const inputRef = useRef(defaultV);

  const handleChange = () => {
    setTarget(inputRef.current.value);
  }

  return (
    <div className="flex gap-1 sm:gap-2 justify-center items-center border p-2 rounded-md w-[50%] shadow-md bg-[#EAEAEA]">
        <div className="drop-shadow-md text-[70%] whitespace-nowrap">
            { innerWidth < 426 ? title.slice(3) + " :" : title + " :" }
        </div>
        <input type="number" onChange={handleChange} ref={inputRef} className="border rounded-md shadow-inner w-[35%] pl-1" defaultValue={defaultV}/>
        <div className="text-[70%] flex items-center">{unit}</div>
    </div>
  )
}

export default TargetInput