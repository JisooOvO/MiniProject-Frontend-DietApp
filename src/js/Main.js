import { Link } from "react-router-dom"

const Main = () => {
  return (
    <div>
        <nav className="flex items-center gap-4">
            <Link to={'/main/add/diet'} className="whitespace-nowrap">식단추가</Link>
            <Link to={'/main/add/activity'} className="whitespace-nowrap">활동추가</Link>
        </nav>
        <div>Main</div>
    </div>
  )
}

export default Main