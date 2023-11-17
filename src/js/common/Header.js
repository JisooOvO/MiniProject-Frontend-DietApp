import { Link } from "react-router-dom"
import logo from "../../images/logo.png"
import "../../style/responsive.css"

const Header = () => {
  return (
    <header className="w-full h-12 drop-shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-between p-5">
        <Link to={''} className="flex flex-col justify-center text-white items-center font-bold text-2xl">
          <img id="logo" src={logo} alt="logo"/>
        </Link>
    </header>
  )
}

export default Header