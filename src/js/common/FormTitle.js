import "../../style/responsive.css"

const FormTitle = ({text1,text2}) => {
  return (
    <div id="loginTitle" className="font-bold flex flex-col items-center 
    justify-center text-[#07B5D5] h-[5%]  md:text-[150%] mt-12 mb-20">
      <div>{text1}</div><div>{text2}</div>
    </div>
  )
}

export default FormTitle;