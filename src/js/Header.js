import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="w-full h-28 bg-red-400 flex justify-between p-5 mb-10">
        <Link to={'/'} className="flex flex-col justify-center items-center font-bold text-2xl">
          <div>헬씨핏</div>
        </Link>
        <nav className="flex items-center gap-4">
          <div>식단추가</div>
          <div>운동추가</div>
        </nav>
    </header>
  )
}

export default Header