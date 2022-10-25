import { useEffect, useState } from "react";
import axios from 'axios';

const USER_URL = "http://localhost:8000/user/";
const EVENT_URL = "http://localhost:8000/event/";

const MyPage = (props) => {

    const [data, setData] = useState([]);
    const [event, setEvent] = useState([]);

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

    useEffect(() => {
        getData();
        getLikes();
    }, [props.id])

    return (
        <div style={{paddingTop: "100px"}}>
            {data.id} <br />
            {data.nickname} <br />
            {data.email}
            {event.map((value) => {
                return (
                    <div>
                        <p>{value.title}</p>
                        <p>{value.filename}</p>
                        <img src={"/img/" + value.filename} style={{width: "200px"}} />
                    </div>
                )
            })}
        </div>
    )
}

export default MyPage;