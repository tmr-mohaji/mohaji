import { useState, useRef } from 'react';
import axios from 'axios';

const BACK_SERVER = "http://localhost:8000";

const FindId = () => {

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const input = useRef();
    const codeInput = useRef();

    const sendEmail = async () => {

        let isId = await axios.post(BACK_SERVER + "/user/findId", {email: input.current.value});

        // 이메일이 존재하면
        if (isId.data) {
            // 이메일로 인증코드 보내기
            let result = await axios.post(BACK_SERVER + "/email", {email});
            setCode(result.data);
        } else {
            alert("입력하신 정보로 등록된 아이디를 찾을 수 없습니다.");
        }
    }

    // 인증코드가 일치하면
    const findId = async () => {

        if (codeInput.current.value == code) {
            let id = await axios.post(BACK_SERVER + "/user/findId", {email: input.current.value});
            console.log(id);
        }
    }

    return (
        <div style={{marginTop: "100px"}}>
            <input type="text" name="email" placeholder="이메일" ref={input}></input>
            <button onClick={sendEmail}>인증코드 발송</button> <br />
            <input type="text" name="code" placeholder="인증코드" ref={codeInput}></input>
            <button type="button" onClick={findId}>아이디 찾기</button>
        </div>
    )
}

export default FindId;