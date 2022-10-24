import { useRef } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8000");

const Chat = () => {

    const div = useRef();
    const msg = useRef();

    // socket.on("notice", (data) => {
    //     let p = document.createElement("p");
    //     p.innerText = data;
    //     div.current.appendChild(p);
    // })

    // socket.on("newMsg", (data) => {
    //     let p = document.createElement("p");
    //     p.innerText = data;
    //     div.current.appendChild(p);
    // })

    const sendMsg = () => {
        // socket.emit("send", {msg : msg.current.value});
    }

    return (
        <div style={{paddingTop: "100px"}}>
            <div ref={div}>

            </div>
            <input type="text" ref={msg}/>
            <button onClick={sendMsg}>전송</button>
        </div>
    )
}

export default Chat;