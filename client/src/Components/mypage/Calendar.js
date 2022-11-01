import React, { useState, useCallback, useEffect } from 'react';
import classNames from "classnames/bind";
import style from "./Calendar.scss";
import { useRef } from 'react';
import MyPlanModal from './MyPlan';


const cnb = classNames.bind(style);

function Calendar(props) {

  // 두번째
  // console.log("두번째", props);

  const [modal , setModal] = useState(false);
  const [modalData , setModalData] = useState();
  const [data, setData] = useState();
  const [ planId, setPlanId ] = useState();
  const [ numId , setNumId ] = useState();

  // 부모 컴포넌트에서 내가 저장한 일정(schedule)이 들어옴.
  const schedule = props.schedule;
  console.log('calendar-schedule:',props.schedule);

  // 들어온 일정데이터를 반복하면서 날짜만 꺼내서 배열에 담아줌.
  const test =() => {
    let ls = [];
    schedule.map((data) => {
      return ls.push(data.date);
    })
    setData(ls);
  }

useEffect(() => {
  test()
},[props.schedule, modalData]);


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

const removeClass = useEffect(() => {
  if ( data != null ) {
    const a = document.getElementsByClassName('weekday');
      for ( let i =0; i<a.length; i++) {
        if (a[i].classList.contains('colorChange')) {
          a[i].classList.remove('colorChange');
        }
      }
  }

},[selectMonth,props.getSchedule]);

const checkEvent = useEffect(() => {
  if ( data != null ) {
    schedule.filter((value) => {
      console.log('calendar:',value);
      const a = document.getElementsByClassName('weekday');
      for ( let i =0; i<a.length; i++) {
        if ( value.date === a[i].getAttribute('date')) {

          a[i].classList.add('colorChange');
          a[i].onclick = function () { 
              setModal(true); 
              setModalData(value);
              setPlanId(value.id);
              setNumId(value.s_id);
            }
          } else {
            setModal(false);
            setModalData();
          }
        }
      });
    }
},[props.schedule, selectMonth ,props.deleteSchedule, props.getSchedule])


  return(
    <div style={{display:'flex',justifyContent:'center'}}>
    <div className='c_entire_layout'>
      <div className='c_header' style={{display:'flex'}}>
        <button className='prevNext' type='button' onClick={prevMonth}> ◀ </button>
        <div className='c_title_section'>
          <span className='c_title'>{ selectYear }</span>년 
          <span className='c_title'>{selectMonth}</span>월
        </div>
        <button className='prevNext' type='button' onClick={nextMonth}> ▶ </button>
        <button className='movetoday' type='button' onClick={MoveToday}> 오늘 </button>
        
      </div>
      <div className='c_body'>
        <div className='c_week_section' style={{display:'flex'}}>{returnWeek()}</div>
        <div className='c_day_section'>{returnDay()}</div>
      </div>
      
      { modal && <div><MyPlanModal modalData={modalData} setModal={setModal} getSchedule={props.getSchedule} id={planId} s_id={numId}/></div> }
    </div>
    </div>
  )

}

export default Calendar;