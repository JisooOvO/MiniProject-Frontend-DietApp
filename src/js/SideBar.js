const SideBar = ({auth}) => {
  return (
    <>
        {
            auth ? 
            <div className="bg-orange-500 w-1/4 h-screen absolute top-0 -z-10">
                <div className="h-28"></div>
                <div>Im sidebar</div>
            </div> : <></>
        }
    </>
  )
}

export default SideBar