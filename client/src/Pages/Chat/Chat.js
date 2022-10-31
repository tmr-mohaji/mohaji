import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import ChatInput from '../../components/ChatInput/ChatInput';

const socket = io.connect(process.env.REACT_APP_BASE_URL);

const Chat = () => {
    const div = useRef();
    const [text, setText] = useState("");
    const [name, setName] = useState("");
    const [socketId, setSocketId] = useState("");
    const [userId, setUserId] = useState("");
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();
    
    // 토큰 정보로 아이디와 닉네임 가져오기
    const getName = () => {
        if ( localStorage.getItem("access_token") != undefined ) {
            axios({
                url: process.env.REACT_APP_USER_URL + '/auth',
                headers: {
                    'Authorization': localStorage.getItem("access_token")
                }
            }).then((result) => {
                setName(result.data.nickname);
                setUserId(result.data.id);
                socket.emit("send_name", {name : result.data.nickname});
            })
        } else {
            navigate("/user/login");
        }
    }

    const getData = async () => {
        const result = await axios.get(process.env.REACT_APP_SOCKET_URL + "/get");
        setHistory(result.data);
    }

    // 공지 등록
    const addNotice = (message) => {
        let p = document.createElement("p");
        p.innerText = message;
        div.current.appendChild(p);
    }

    // 메세지 전송
    const date = new Date();

    const addMsg = (name, message) => {
        let name_span = document.createElement("span");
        let span = document.createElement("span");
        let p = document.createElement("p");
        name_span.innerText = name;
        p.innerText = message;

        let minute = (date.getMinutes() < 10 ? "0" + date.getMinutes() : "" + date.getMinutes());
        if (date.getHours() > 12) {
            span.innerText = "오후 " + (date.getHours() - 12) + ":" + minute;
        } else if (date.getHours() < 12) {
            span.innerText = "오전 " + date.getHours() + ":" + minute;
        } else {{
            span.innerText = "오후 " + date.getHours() + ":" + minute;
        }}

        div.current.appendChild(name_span);
        div.current.appendChild(p);
        div.current.appendChild(span);
        
        const form = document.querySelector("form");
        form.reset();
    }

    // 메세지 값 가져오기
    const onChange = (e) => {
        // if (e.key === "Enter") {
        //     sendMsg();
        // }
        setText(e.target.value);
    }

    // 전송 버튼
    const sendMsg = async () => {
        const result = await axios.post(process.env.REACT_APP_SOCKET_URL + "/send", {
            user_id : userId, nickname : name, message : text
        });
        socket.emit("send", {msg : text, nickname : name});
    }

    useEffect(() => {
        getName();
        getData();

        // socket
        socket.on("send_id", (data) => {
            setSocketId(data.id);
        })

        socket.on("notice", (data) => {
            addNotice(data.msg);
        })

        socket.on("newMsg", (data) => {
            // addMsg(data.nickname, data.msg);
            getData();
        })
    }, [])

    return (
        <div style={{paddingTop: "100px"}}>
            <h1>채팅</h1>

            <div ref={div}>
                {history.map((data) => {
                    return (<>
                    {data.user_id == userId ? <div style={{color: "red"}}><p>닉네임 : {data.nickname}</p><p>메세지 : {data.message}</p><p>시간 : {data.createdAt}</p></div> : <div><p>닉네임 : {data.nickname}</p><p>메세지 : {data.message}</p><p>시간 : {data.createdAt}</p></div>}
                    </>)
                })}
            </div>

            <ChatInput sendMsg={sendMsg} onChange={onChange} />
        </div>
    )
}

export default Chat;