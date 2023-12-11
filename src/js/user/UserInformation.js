import { useEffect, useState } from "react";
import "../../style/responsive.css"
import { useParams } from "react-router-dom";

const UserInformation = ({ height, weight, gender, age, activityFactor, func }) => {
    const slot = useParams().slot;
    const [weightView, setWeightView] = useState('');
    const handleToggleNurtBt = (e) => {
        e.target.nextSibling.classList.toggle("hidden");
    }

    const handleResize = () => {
        const NutrToggleHidden = document.querySelector("#NutrToggleHidden");
        const NutrToggleBt = document.querySelector("#NutrToggleBt");
        let width = window.innerWidth;
        if (width < 765) {
            if (NutrToggleHidden) NutrToggleHidden.classList.add("hidden");
            if(NutrToggleBt) NutrToggleBt.classList.remove("hidden");
        } else {
            if (NutrToggleHidden) NutrToggleHidden.classList.remove("hidden");
            if(NutrToggleBt) NutrToggleBt.classList.add("hidden");
        }
    }

    window.addEventListener('resize', () => {
        handleResize();
    });


    useEffect(()=>{
        setWeightView(
            <input type="number" id="weight" defaultValue={weight} name="weight"
            className="border max-w-[5rem] text-[80%] sm:max-w-[6rem] shadow-inner p-1 rounded-lg" />
        )
    },[weight])

    useEffect(()=>{
        handleResize();
    },[])

    return (
        <div>
            <div id="NutrToggleBt" onClick={handleToggleNurtBt} className="border justify-center items-center flex rounded-lg whitespace-nowrap text-[60%] shadow-lg w-24 h-8 mb-2 ml-[5%] bg-[#14A8DD] hover:bg-[#3A84F5] text-white">
                내 정보 보기 🔻
            </div>
            <div id="NutrToggleHidden" className="grid grid-cols-1 relative md:grid-cols-2 gap-2 items-center w-[90%] mx-auto">
                <button onClick={func} id="responsiveBt" className="absolute -top-[12%] right-0 md:top-[100%]
                border flex justify-center items-center rounded-lg whitespace-nowrap text-[60%] sm:text-[80%]
                shadow-lg w-24 h-8 mb-2 ml-[5%] bg-[#14A8DD] hover:bg-[#3A84F5] text-white">
                    설정 저장
                </button>
                <div className="w-full md:mx-auto p-2 border
                 bg-[#efefef] flex items-center shadow-inner rounded-lg mb-1">
                    <div className="flex flex-col justify-center drop-shadow-md whitespace-nowrap
                     p-2 w-[40%] text-[80%] text-end">나의 키</div>
                    <div className="flex gap-2 h-full justify-center items-center">
                        <input type="number" id="height"
                            defaultValue={height} name="height"
                            className="border max-w-[5rem] text-[80%] sm:max-w-[7rem] shadow-inner p-1 rounded-lg" />
                        <span className="text-[80%]">cm&nbsp;</span>
                    </div>
                </div>
                <div className="w-full md:mx-auto p-2 border
                 bg-[#efefef] flex items-center shadow-inner rounded-lg mb-1">
                    <div className="flex flex-col justify-center drop-shadow-md whitespace-nowrap
                     p-2 w-[40%] text-[80%] text-end">{slot} 몸무게</div>
                    <div className="flex gap-2 h-full justify-center items-center">
                        {weightView}
                        <span className=" text-[80%]">kg&nbsp;</span>
                    </div>
                </div>
                <div className="w-full md:mx-auto p-2 border
                 bg-[#efefef] flex items-center shadow-inner rounded-lg mb-1">
                    <div className="flex flex-col justify-center drop-shadow-md whitespace-nowrap
                     p-2 w-[40%] text-[80%] text-end">나의 성별</div>
                    <div className="flex gap-2 h-full justify-center items-center">
                        <select id="gender" defaultValue={gender} name="gender"
                            className="border  text-[80%] w-[5rem] sm:w-[7rem] p-1 shadow-inner rounded-lg">
                            <option value={1}>남자</option>
                            <option value={2}>여자</option>
                        </select>
                    </div>
                </div>
                <div className="w-full md:mx-auto p-2 border
                 bg-[#efefef] flex items-center shadow-inner rounded-lg mb-1">
                    <div className="flex flex-col justify-center drop-shadow-md whitespace-nowrap
                     p-2 w-[40%] text-[80%]  text-end">나의 나이</div>
                    <div className="flex gap-2 h-full justify-center items-center">
                        <input type="number" id="age"
                            defaultValue={age} name="age"
                            className="border max-w-[5rem] text-[80%] sm:max-w-[7rem] shadow-inner p-1 rounded-lg" />
                        <span className="text-[80%]">세&nbsp;</span>
                    </div>
                </div>
                <div className="w-full md:mx-auto p-2 border md:col-span-2
                 bg-[#efefef] flex items-center shadow-inner rounded-lg mb-1">
                    <div className="flex flex-col justify-center drop-shadow-md whitespace-nowrap
                     p-2 w-[40%] text-[80%] text-end sm:text-center">나의 활동량</div>
                    <div className="flex gap-2 h-full justify-center items-center">
                        <select id="activityFactor" defaultValue={activityFactor} name="activityFactor"
                            className="border text-[80%] md:w-[20rem] p-1 rounded-lg
                        shadow-inner w-[7rem] sm:w-[16rem]">
                            <option value={1}>휴식 상태(소파에서 누워있는 등)</option>
                            <option value={2}>가벼운 활동(좋아하는 취미 활동)</option>
                            <option value={3}>보통의 활동(가벼운 운동을 주당 3-4회하는 등)</option>
                            <option value={4}>활발한 활동(매일 운동을 하는 정도)</option>
                            <option value={5}>극심한 활동(운동선수 수준의 활동)</option>
                        </select> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInformation