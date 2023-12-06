import { useState } from "react";
import DayComponent from "./DayComponent";
import "../../style/animation.css";

const Calendar = ({ currentYear, currentMonth }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const currentMonthFirstDate = new Date(
    currentYear + "-" + currentMonth + "-" + 1
  ); // 해당 달의 첫 날
  const nextMonth = new Date(currentYear, currentMonth, 1);
  const currentMonthLastDate = new Date(nextMonth - 1).getDate(); // 해당 달의 마지막 날
  const lastMonthLastDate = new Date(currentMonthFirstDate - 1).getDate(); // 지난 달의 마지막 날
  const weeksNm = ["일", "월", "화", "수", "목", "금", "토"];
  const firstDay = currentMonthFirstDate.getDay(); // 해당 달의 1일의 요일
  let calendarFirstDay = lastMonthLastDate - firstDay + 1; // 달력 상 첫번째 날

  const CALENDARNUMBER = 42; // 달력에서 보일 최대 일 수 = 42

  let dates = [];

  const response = document.querySelectorAll("#response");
  window.addEventListener("resize", () => {
    setInnerWidth(window.innerWidth);
    if (innerWidth > 636) {
      response.forEach((item) => item.classList.remove("hidden"));
    } else {
      response.forEach((item) => item.classList.add("hidden"));
    }
  });

  for (let i = calendarFirstDay; i <= lastMonthLastDate; i++) {
    dates.push(i);
  }

  for (let i = 1; i <= currentMonthLastDate; i++) {
    dates.push(i);
  }

  const restDates = CALENDARNUMBER - dates.length;
  for (let i = 1; i <= restDates; i++) {
    dates.push(i);
  }

  return (
    <div className="w-full h-[50rem]">
      <table className="w-full shadow-2xl">
        <thead className="h-[10%] text-white bg-[#06B6D4]">
          <tr>
            {weeksNm.map((item, idx) => (
              <th className="border-black border" key={`key${idx}`}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2, 3, 4, 5].map((item) => {
            return (
              <tr key={`key${item}`}>
                {dates.slice(7 * item, 7 * item + 7).map((d, idx) => {
                  let isLastMonth = false;
                  let isNextMonth = false;

                  if (item === 0 && d > 25) {
                    isLastMonth = true;
                  }
                  if (item === 5 && d < 28) {
                    isNextMonth = true;
                  }
                  return (
                    <DayComponent
                      key={`key${idx}`}
                      innerWidth={innerWidth}
                      currentYear={currentYear}
                      currentMonth={currentMonth}
                      isLastMonth={isLastMonth}
                      isNextMonth={isNextMonth}
                      d={d}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
