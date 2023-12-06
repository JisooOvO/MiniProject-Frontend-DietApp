const UserSeachContainer = ({setSearchFood,setIsLoading,setSearchFoodList,token,fastSearch,setFastSearch}) => {

  /** 검색 함수 */
  const handleSearch = (e) => {
    e.preventDefault();
    const search = document.querySelector("#searchfood").value;

    setSearchFood('');

    setIsLoading(true);

    fetch("http://10.125.121.212:8080/api/private/searchFoodList", {
      method: "POST",
      headers: {
        "Authorization": token
      },
      body: JSON.stringify({
        "foodname": search
      })
    })
    .then(res => res.json())
    .then(data => {
      setIsLoading(false)
      setSearchFoodList(data);
    })
    .catch(e => {
      console.log(e);
      alert("데이터 조회 중 에러 발생");
    });
  } 
  
  /** 초성 확인 함수 */
  function isInitialConsonant(char) {
     const initialConsonants = /ㄱ|ㄲ|ㄴ|ㄷ|ㄸ|ㄹ|ㅁ|ㅂ|ㅃ|ㅅ|ㅆ|ㅇ|ㅈ|ㅉ|ㅊ|ㅋ|ㅌ|ㅍ|ㅎ/;
      return initialConsonants.test(char);
  }

  /** 자동완성 함수 */
  const handleSearchFood = (e) => {
    const targetNm = e.target.value;

    if (isInitialConsonant(targetNm)) return;
    if (targetNm === '') return;

    fetch("http://10.125.121.212:8080/api/private/fastSearch2", {
        method: 'post',
        headers: {
        "Authorization": token,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        "foodname": targetNm
        })
    })
    .then(res => res.json())
    .then(data => {
      const target = data.map(item => item["foodname"]).slice();
      if (target.length > 0) {
          setFastSearch(target.map((item, idx) =>
          <div key={`key${idx}`} tabIndex={1} id="fastSearchItem" className="border z-50 p-1 hover:bg-[#EAEAEA] focus:bg-[#EAEAEA]"
              onKeyDown={(e) => {
                const searchfood = document.querySelector("#searchfood");
                if (e.key === "Enter") {
                    searchfood.value = e.target.innerText;
                    handleSearch(e);
                    setFastSearch('');
                }
                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    const next = e.target.nextSibling;
                    if (next) next.focus();
                    else searchfood.focus();
                }
                if (e.key === "ArrowUp") {
                    e.preventDefault();
                    const prev = e.target.previousSibling;
                    if (prev) prev.focus();
                    else searchfood.focus();
                }
              }}
              onClick={(e) => {
                const searchfood = document.querySelector("#searchfood");
                searchfood.value = e.target.innerText;
                handleSearch(e);
                setFastSearch('');
              }}
          >{item}</div>
          ))
      }

      if (target.length === 0) {
          setFastSearch(
            <div>검색 조건에 해당하는 음식이 존재하지 않습니다.</div>
          )
      }
    })
    .catch(e => console.log(e));
  }

  /** 자동완성 함수 키다운시 발생하는 함수 */
  const handleInputSearchKeydown = (e) => {
    const fastSearchItem = document.querySelectorAll("#fastSearchItem");
    if (e.key === "ArrowDown") {
        e.preventDefault();
        fastSearchItem[0].focus();
    }
  }

  /** 즐겨찾기 검색 함수 */
  const handleFavorites = (e) => {
    e.preventDefault();
    setSearchFood('');
    setIsLoading(true);
    fetch("http://10.125.121.212:8080/api/private/searchFavoriteFoods", {
    method: "post",
    headers: {
        "Authorization": token,
    }
    })
    .then(res => res.json())
    .then(data => {
      setIsLoading(false)
      setSearchFoodList(data);
    })
    .catch(e => console.log(e));
  }

  return (
    <form className="mb-2 w-full relative flex items-center gap-2">
        <input id="searchfood" type="text" name="food" 
        className="w-full p-2 shadow-inner rounded-lg border-b-2"
        onChange={handleSearchFood}
        onKeyDown={handleInputSearchKeydown}
        autoComplete="off"
        placeholder="음식을 검색하세요" />
        {
        fastSearch ?
        <div id="fastSearch" 
        onMouseLeave={() => { setFastSearch('') }} 
        tabIndex={1} 
        className="absolute top-[100%] bg-white border-2 border-gray-700 rounded-md w-full mt-1 z-50">
            {fastSearch}
        </div> 
        : ''
        }
        <div className="relative">
        <span id="searchBt" className="text-sm hidden absolute -top-4 -left-3 whitespace-nowrap">검색하기</span>
        <button
            onClick={handleSearch}
            onMouseEnter={() => {
              const searchBt = document.querySelector("#searchBt");
              searchBt.classList.remove("hidden");
            }}
            onMouseLeave={() => {
              const searchBt = document.querySelector("#searchBt");
              searchBt.classList.add("hidden");
            }}
            className="hover:cursor-pointer p-1 w-7 h-7 hover:bg-[#707070] shadow-md bg-white rounded-[50%] border flex flex-col justify-center items-center">
            🔍
        </button>
        </div>
        <div className="relative">
        <span id="favoritesBt" className="text-sm hidden absolute -top-4 -left-2 whitespace-nowrap">즐겨찾기</span>
        <button
            onClick={handleFavorites}
            onMouseEnter={() => {
              const favoritesBt = document.querySelector("#favoritesBt");
              favoritesBt.classList.remove("hidden");
            }}
            onMouseLeave={() => {
              const favoritesBt = document.querySelector("#favoritesBt");
              favoritesBt.classList.add("hidden");
            }}
            className="hover:cursor-pointer p-1 w-7 h-7 hover:bg-[#707070] shadow-md bg-white text-yellow-300
            rounded-[50%] border flex flex-col justify-center items-center">
            ★
        </button>
        </div>
    </form>
  )
}

export default UserSeachContainer