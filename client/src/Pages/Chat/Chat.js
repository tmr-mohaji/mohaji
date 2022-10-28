import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect(process.env.REACT_APP_BASE_URL);

const Chat = () => {

    const div = useRef();
    const msg = useRef();
    const [name, setName] = useState("");
    const [socketId, setSocketId] = useState("");
    const navigate = useNavigate();
    
    const getName = () => {
        if ( localStorage.getItem("access_token") != undefined ) {
            axios({
                url: process.env.REACT_APP_USER_URL + '/auth',
                headers: {
                    'Authorization': localStorage.getItem("access_token")
                }
            }).then((result) => {
                setName(result.data.nickname);
            })
        } else {
            navigate("/user/login");
        }
    }

    const addNotice = (message) => {
        let p = document.createElement("p");
        p.innerText = message;
        div.current.appendChild(p);
    }

    const addMsg = (message) => {
        let p = document.createElement("p");
        p.innerText = message;
        div.current.appendChild(p);
        msg.current.value = "";
    }

    useEffect(() => {
        getName();
    }, [])


    // socket
    socket.on("send_id", (data) => {
        setSocketId(data.id);
    })

    socket.emit("send_name", {name : name});

    socket.on("notice", (data) => {
        addNotice(data.msg);
    })

    socket.on("newMsg", (data) => {
        addMsg(data.msg);
    })

    const sendMsg = () => {
        socket.emit("send", {msg : msg.current.value});
    }

    return (
        <div style={{paddingTop: "100px"}}>
            <h1>채팅</h1>
            <div ref={div}>

            </div>
            <input type="text" ref={msg}/>
            <button onClick={sendMsg}>전송</button>
        </div>
    )
}

export default Chat;