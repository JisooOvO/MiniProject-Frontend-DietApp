import { Link } from "react-router-dom"
import "../../style/responsive.css"

const LinkButton = ({url,title}) => {
  return (
    <Link to={url} id="linkButton" className="w-1/6 h-14 border-[1] bg-[#14A8DD] hover:bg-[#3A84F5]
     text-white text-2xl rounded-lg whitespace-nowrap flex flex-col justify-center items-center z-10 shadow-xl">{title}</Link>
  )
}

export default LinkButton