import { Link } from "react-router-dom"

const Header = ({auth}) => {
  return (
    <header className="w-full h-20 bg-red-400 flex justify-between p-5">
        <Link to={''} className="flex flex-col justify-center items-center font-bold text-2xl">
          헬씨핏
        </Link>
    </header>
  )
}

export default Header