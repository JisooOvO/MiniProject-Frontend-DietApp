import { Link } from "react-router-dom"
import logo from "../../images/logo.png"
import "../../style/responsive.css"
import { LuUser2 } from "react-icons/lu";

const Header = () => {
  return (
    <header className="w-full h-12 drop-shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-between items-center px-4">
        <Link to={''} className="flex flex-col justify-center text-white items-center font-bold text-2xl">
          <img id="logo" src={logo} alt="logo" className="hover:opacity-70"/>
        </Link>
        <ul>
          <li className="border rounded-[50%] w-7 h-7 flex justify-center items-center bg-white drop-shadow-md hover:cursor-pointer hover:bg-slate-200"><LuUser2/></li>
        </ul>
    </header>
  )
}

export default Header