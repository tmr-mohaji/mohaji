import { useEffect, useState } from "react";
import axios from 'axios';

import Button from "../components/Button";

const MyPage = (props) => {

    const [data, setData] = useState([]);
    const [event, setEvent] = useState([]);
    const [schedule, setSchedule] = useState([]);

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

    const deleteSchedule = async (id) => {
        if ( props.id != "") {
            let result = await axios.get(process.env.REACT_APP_SCHEDULE_URL + "/deleteEvent", {
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
        <div style={{paddingTop: "100px"}}>
            <Button name="회원 정보" />
            <Button name="즐겨찾기" />
            <Button name="일정"  />
            <h1>유저 정보</h1>
            {data.id} <br />
            {data.nickname} <br />
            {data.email}
            <hr />
            <h1>좋아요 정보</h1>
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
            })}
        </div>
    )
}

export default MyPage;