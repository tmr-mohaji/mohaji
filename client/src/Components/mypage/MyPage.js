import { useEffect, useState } from "react";
import axios from 'axios';
import './Mypage.scss';
import { Nav } from 'react-bootstrap'
import Favorites from './Favorites';
import Plan from './Plan';


const USER_URL = "http://localhost:8000/user/";
const EVENT_URL = "http://localhost:8000/event/";
const SCHEDULE_URL = "http://localhost:8000/schedule/";

const MyPage = (props) => {

    const [tab, setTab] = useState(0);
    const [data, setData] = useState([]);
    const [color, setColor] =useState();
    const [event, setEvent] = useState([]);
    const [schedule, setSchedule] = useState([]);

    const getData = async () => {
        // 로그인 상태
        if (props.id != "") {
            let result = await axios.get(USER_URL + "info", {
                params: {id : props.id}
            })
            setData(result.data);
        }
    }

    const getLikes = async () => {
        if (props.id != "") {
            let result = await axios.post(EVENT_URL + "likeInfo", {user_id : props.id});
            setEvent(result.data);
        }
    }

    const getSchedule = async () => {
        if (props.id != "") {
            let result = await axios.get(SCHEDULE_URL + "getEvent", {
                params : {user_id : props.id}
            });
            setSchedule(result.data);
        }
    }

    const deleteSchedule = async (id) => {
        if ( props.id != "") {
            let result = await axios.get(SCHEDULE_URL + "deleteEvent", {
                params : {id : id}
            });
            getSchedule();
        }
    }

    useEffect(() => {
        getData();
        getLikes();
        getSchedule();
    }, [props.id])

    return (
        <div style={{paddingTop: "70px", minHeight:'100vh'}}>
            <div><img src='/img/back.jpg' style={{width:'100%', height:'250px'}}/></div>
            <div style={{display:'flex', justifyContent:'center'}}>
            <Nav className='tab_section' variant="tabs" defaultActiveKey="link0">
                <div className='item_layout'>
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => setTab(0)}>일정</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => setTab(1)}>즐겨찾기</Nav.Link>
                </Nav.Item>
                </div>
                {/* <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => setTab(2)}>버튼2</Nav.Link>
                </Nav.Item> */}
            </Nav>
            </div>
            <div className='mypage_entire_layout'>
                <div className='mypage_entire_section'>
                    <div className='userInfo_section'>
                        <div style={{border:'3px solid yellow',height:'100%'}}>
                            <img src='/img/userinfo.png' style={{width:'130px', height:'130px'}}/>
                            <div>{data.id}</div>
                            <div>{data.nickname}</div>
                            <div>{data.email}</div>
                            <button type='button'>로그아웃</button>
                        </div>
                    </div>
                    <div className='tabpart'>
                        <div style={{border:'3px solid green',height:'100%'}}>
                            <TabContent tab={tab} event={event} schedule={schedule} id={props.id}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPage;


function TabContent(props) {
    const id = props.id;
    return [<Favorites event={props.event}/>, <Plan schedule={props.schedule} id={id}/>][props.tab] 
  }

// 회원정보, 즐겨찾기 , 일정
{/* <h1>유저 정보</h1>
            {data.id} <br />
            {data.nickname} <br />
            {data.email}
            <hr /> */}

{/* <h1>좋아요 정보</h1>
            {event.map((value) => {
                return (
                    <div>
                        <p>{value.title}</p>
                        <img src={"/img/" + value.filename} style={{width: "200px"}} />
                    </div>
                )
            })}
            <hr />
            <h1>스케줄</h1>
            {schedule.map((value) => {
                return (
                    <div>
                        <p>{value.title}</p>
                        <p>{value.date}</p>
                        <p onClick={() => {deleteSchedule(value.id)}}>x</p>
                    </div>
                )
            })} */}