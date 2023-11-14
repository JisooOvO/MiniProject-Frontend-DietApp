const FoodLists = ({FoodList}) => {

  const handleSelectFood = (e) => {
    console.log(e.target.innerText);
  }

  const view = FoodList.map((item,idx)=>
    <tr onClick={handleSelectFood} key={`key${idx}`}>
      <td>{item.DESC_KOR}</td>
      <td>{item.NUTR_CONT1}</td>
      <td>{item.NUTR_CONT2}</td>
      <td>{item.NUTR_CONT3}</td>
      <td>{item.NUTR_CONT4}</td>
      <td>{item.NUTR_CONT5}</td>
      <td>{item.NUTR_CONT6}</td>
      <td>{item.NUTR_CONT7}</td>
      <td>{item.NUTR_CONT8}</td>
      <td>{item.NUTR_CONT9}</td>

    </tr>
  )
  return (
    <table>
      <thead>
        <tr>
          <th>식품명</th>
          <th>칼로리</th>
          <th>탄수화물</th>
          <th>단백질</th>
          <th>지방</th>
          <th>당류</th>
          <th>나트륨</th>
          <th>콜레스테롤</th>
          <th>포화지방산</th>
          <th>트랜스지방산</th>
        </tr>
      </thead>
      <tbody>
        {view}
      </tbody>
    </table>
  )
}

export default FoodLists;