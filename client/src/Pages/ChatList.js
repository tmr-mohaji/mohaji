import { createElement, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Room from '../components/Room/Room.js';

const socket = io.connect("http://localhost:8000");

const ChatList =  () => {

    const room = useRef();
    const [roomName, setRoomName] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        room.current.hidden = true;
    }, []);

    const getInput = (e) => {
        console.log(e.target.value);
        setMsg(e.target.value);
    }

    const sendMsg = () => {
        socket.emit("newMsg", {msg : msg, room : roomName}, () => {
            // 자신한테 보내기
            addMsg(msg);
        });
    }

    const showRoom = () => {
        room.current.hidden = false;
    }

    const addMsg = (msg) => {
        let div = document.querySelector(".chatRoom div");
        let p = document.createElement("p");
        p.innerText = msg;
        div.appendChild(p);
    }

    const joinRoom = () => {
        socket.emit('enterRoom', {room : 'room1'}, showRoom);
        setRoomName('room1');
    }

    socket.on("welcome", () => {
        addMsg("welcome");
    })

    socket.on("bye", () => {
        addMsg("bye");
    })

    socket.on("newMsg", (msg) => {
        addMsg(msg);
    })

    return(
        <div style={{paddingTop: "100px"}}>
            <button onClick={joinRoom}>join Room</button>
            <div ref={room}>
                <Room roomName={roomName} onChange={getInput} onClick={sendMsg}/>
            </div>
        </div>
    )
}

export default ChatList;