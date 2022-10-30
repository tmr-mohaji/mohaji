import React, { useState, useCallback, useEffect } from 'react';
import classNames from "classnames/bind";
import style from "./Calendar.scss";
import { useRef } from 'react';
import MyPlanModal from './MyPlan';


const cnb = classNames.bind(style);

function Calendar(props) {

  const [modal , setModal] = useState(false);
  const [modalData , setModalData] = useState();
  const [data, setData] = useState();
  const [scheduleContent , setScheduleContent] = useState([]);
  const schedule = props.schedule;
  console.log('sch-:',schedule);

  const test =() => {
    let ls = [];
    schedule.map((data) => {
      return ls.push(data.date);
    })
    setData(ls);
  }
console.log('Data:',data);

useEffect(() => {
  test()
},[props.schedule]);


  const today = {
    year : new Date().getFullYear(),
    month : new Date().getMonth() + 1,
    date : new Date().getDate(),
    day : new Date().getDay(), //요일
  }

  const weeks = ['일','월','화','수','목','금','토'];
  const [ selectYear , setSelectYear ] = useState(today.year);
  const [ selectMonth , setSelectMonth ] = useState(today.month);
  const [ selectDay , setSelectDay ] = useState(weeks[today.day]);
  const dateTotal = new Date(selectYear, selectMonth, 0).getDate(); //해당 날짜의 마지막 요일

  const prevMonth = useCallback(() => {
    if (selectMonth == 1) {
      setSelectMonth(12);
      setSelectYear(selectYear - 1);
    } else {
      setSelectMonth(selectMonth - 1);
    }
  },[selectMonth]);

  const nextMonth = useCallback(() => {
    if (selectMonth == 12) {
      setSelectMonth(1);
      setSelectYear(selectYear + 1);
    } else {
      setSelectMonth(selectMonth + 1);
    }
  },[selectMonth]);

  const MoveToday =  useCallback(() => {
    setSelectYear(today.year);
    setSelectMonth(today.month);
    setSelectDay(today.day);
  })

  const returnWeek = useCallback(() => {
    let weekArr = [];
    weeks.forEach((v) => {
      weekArr.push(
        <div
          key={v}
          className={cnb(
            { weekday: true },
            { sunday: v === "일" },
            { saturday: v === "토" }
          )}
        >
          {v}
        </div>
      );
    });
    return weekArr;
  }, []);


  const returnDay = useCallback(() => {
    let dayArr = [];

    for (const nowDay of weeks ) {
      const day = new Date(selectYear, selectMonth - 1, 1).getDay();
      if (weeks[day] === nowDay) {
        for (let i = 0; i < dateTotal; i++) {
          dayArr.push(
            <div
              key={i + 1}
              value={i + 1}
              date= { selectMonth < 10 ? ( i + 1 < 10 ? `${selectYear}-0${selectMonth}-0${i + 1}` : `${selectYear}-0${selectMonth}-${i + 1}`) : ( i + 1 < 10 ? `${selectYear}-${selectMonth}-0${i + 1}` : `${selectYear}-${selectMonth}-${i + 1}`)}
              className={cnb(
                {
                  //오늘 날짜일 때 표시할 스타일 클라스네임
                  today:
                    today.year === selectYear &&
                    today.month === selectMonth &&
                    today.date === i + 1,
                },
                { weekday: true }, //전체 날짜 스타일
                {
                  //전체 일요일 스타일
                  sunday:
                    new Date(
                      selectYear,
                      selectMonth - 1,
                      i + 1
                    ).getDay() === 0,
                },
                {
                  //전체 토요일 스타일
                  saturday:
                    new Date(
                      selectYear,
                      selectMonth - 1,
                      i + 1
                    ).getDay() === 6,
                }
              )}
            >
              {i + 1}
            </div>
          );
        }
      } else {
        dayArr.push(<div className="weekday"><div></div></div>);
      }
    }
    return dayArr;
  }, [selectYear, selectMonth, dateTotal]);

  // function MyPlan(e) {
  //   alert('하이');
  //   setModal(true);
  // }

const checkEvent = useEffect(() => {

  if ( data != null ) {

    // 스케쥴 데이터가 div date값을 돌면서 서로 일치하는 div만 가져옴
    // 그 div에 각 데이터 타이틀을 넣어준다. 
    schedule.filter((value) => {
      const a = document.getElementsByClassName('weekday');
      for ( let i =0; i<a.length; i++) {
        if ( value.date == a[i].getAttribute('date')) {
          a[i].classList.add('colorChange');
          a[i].onclick = function () { 
              setModal(true); 
              setModalData(value);
            }
          }
        }
      });
    }
},[props.schedule, selectMonth,props.deleteSchedule])


  return(
    <div style={{display:'flex',justifyContent:'center'}}>
    <div className='c_entire_layout'>
      <div className='c_header' style={{display:'flex'}}>
        <button className='prevNext' type='button' onClick={prevMonth}> ◀ </button>
        <div className='c_title_section'>
          <span style={{fontSize:'20px', fontWeight:'700',marginRight:'10px'}}>{ selectYear }</span>년 
          <span style={{fontSize:'20px', fontWeight:'700',margin:'0 10px'}}>{selectMonth}</span>월
        </div>
        <button className='prevNext' type='button' onClick={nextMonth}> ▶ </button>
        <button className='movetoday' type='button' onClick={MoveToday}> 오늘 </button>
        
      </div>
      <div className='c_body'>
        <div className='c_week_section' style={{display:'flex'}}>{returnWeek()}</div>
        <div className='c_day_section'>{returnDay()}</div>
      </div>
      
      { modal && <div><MyPlanModal modalData={modalData} setModal={setModal}/></div> }
    </div>
    </div>
  )

}

export default Calendar;