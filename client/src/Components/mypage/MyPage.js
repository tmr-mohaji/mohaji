import { useEffect, useState } from "react";
import axios from 'axios';
import './Mypage.scss';
import { Nav } from 'react-bootstrap'
import Favorites from './Favorites';
import Plan from './Plan';
import Reply from "./Reply";

const MyPage = (props) => {

    const [tab, setTab] = useState(0);
    const [data, setData] = useState([]);
    const [color, setColor] =useState();
    const [event, setEvent] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [reply, setReply] = useState([]);

    const getData = async () => {
        // 로그인 상태
        if (props.id != "") {
            let result = await axios.get(process.env.REACT_APP_USER_URL + "/info", {
                params: {id : props.id}
            })
            setData(result.data);
        }
    }

    const getLikes = async () => {
        if (props.id != "") {
            let result = await axios.post(process.env.REACT_APP_EVENT_URL + "/likeInfo", {user_id : props.id});
            setEvent(result.data);
        }
    }

    const getSchedule = async () => {
        if (props.id != "") {
            let result = await axios.get(process.env.REACT_APP_SCHEDULE_URL + "/getEvent", {
                params : {user_id : props.id}
            });
            setSchedule(result.data);
        }
    }

    const getReply = async () => {
        if (props.id != "") {
            let result = await axios.get(process.env.REACT_APP_REVIEW_URL + "/getComment", { params : {user_id : props.id}});

            if (result.data.filename != false) {
                for (let i = 0; i < result.data.result.length; i++) {
                    result.data.result[i]['filename'] = result.data.filename[i];
                }
            }

            setReply(result.data.result);
        }
    }

    useEffect(() => {
        getData();
        getLikes();
        getSchedule();
        getReply();
    }, [props.id])

    return (
        <div style={{paddingTop: "70px", minHeight:'100vh'}}>
            <div><img src='/img/back.jpg' style={{width:'100%', height:'250px'}}/></div>
            <div style={{display:'flex', justifyContent:'center'}}>
            <Nav className='tab_section' variant="tabs" defaultActiveKey="link0">
                <div className='item_layout'>
                <Nav.Item onClick={() => setTab(0)}>
                    <Nav.Link eventKey="link0">일정</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => setTab(1)}>
                    <Nav.Link eventKey="link1">즐겨찾기</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => setTab(2)}>
                    <Nav.Link eventKey="link2">내 댓글</Nav.Link>
                </Nav.Item>
                </div>

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
                            <TabContent tab={tab} event={event} schedule={schedule} reply={reply} id={props.id}/>
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
    return [<Plan schedule={props.schedule} id={id}/>, <Favorites event={props.event}/>,<Reply reply={props.reply} />][props.tab] 
}
