import { Link } from "react-router-dom"

const LinkButton = ({url,title}) => {
  return (
    <Link to={url} className="w-1/6 h-10 border-[1] bg-[#14A8DD] hover:bg-[#3A84F5]
     text-white text-lg rounded-lg flex flex-col justify-center items-center shadow-xl">{title}</Link>
  )
}

export default LinkButton