import { useState, useRef } from 'react';
import axios from 'axios';

const BACK_SERVER = "http://localhost:8000";

const FindId = () => {

    const [email, setEmail] = useState('');
    const input = useRef();

    const sendEmail = async () => {
        let isId = await axios.post(BACK_SERVER + "/user/findId", {email: input.current.value});
        
        if (isId.data) {
            let result = await axios.post(BACK_SERVER + "/email", {email});
        } else {
            alert("입력하신 정보로 등록된 아이디를 찾을 수 없습니다.");
        }
    }

    return (
        <div style={{marginTop: "100px"}}>
            <input type="text" name="email" placeholder="이메일" ref={input}></input>
            <button onClick={sendEmail}>아이디 찾기</button>
        </div>
    )
}

export default FindId;