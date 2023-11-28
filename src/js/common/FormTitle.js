import "../../style/responsive.css"

const FormTitle = ({text1}) => {
  return (
    <div id="loginTitle" className="font-bold flex flex-col items-center justify-center text-[#07B5D5] whitespace-nowrap text-[100%] sm:text-[150%]">
      <span>{text1}</span>
    </div>
  )
}

export default FormTitle;