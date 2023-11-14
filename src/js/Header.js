import { Link } from "react-router-dom"

const Header = ({auth}) => {
  return (
    <header className="w-full h-28 bg-red-400 flex justify-between p-5 mb-10">
        <Link to={''} className="flex flex-col justify-center items-center font-bold text-2xl">
          헬씨핏
        </Link>
        { auth ? 
          <nav className="flex items-center gap-4">
            <Link to={'/add/diet'} className="whitespace-nowrap">식단추가</Link>
            <Link to={'/add/activity'} className="whitespace-nowrap">활동추가</Link>
          </nav>
          : <></>
        }
    </header>
  )
}

export default Header