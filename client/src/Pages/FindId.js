import { useState, useRef } from 'react';
import axios from 'axios';

const BACK_SERVER = "http://localhost:8000";

const FindId = () => {

    const [code, setCode] = useState('');
    const input = useRef();
    const codeInput = useRef();

    const sendEmail = async () => {

        const emailCheck = await axios.post(BACK_SERVER + "/user/emailCheck", {email: input.current.value});
        const isEmail = emailCheck.data.valid;

        // 이메일이 존재하면
        if (!isEmail) {
            console.log("인증코드가 발송되었습니다.");
            // 이메일로 인증코드 보내기
            const result = await axios.post(BACK_SERVER + "/email", {email: input.current.value});
            const code = result.data.code;
            setCode(code);
        } else {
            alert("입력하신 정보로 등록된 아이디를 찾을 수 없습니다.");
        }
    }

    // 인증코드가 일치하면
    const findId = async () => {

        if (codeInput.current.value == code) {

            const idResult = await axios.post(BACK_SERVER + "/user/findId", {email: input.current.value});
            const id = idResult.data.id;

            if (id == null) {
                console.log("존재하지 않는 아이디");
            } else {
                console.log(id.id);
            }

        } else {
            console.log("인증 실패");
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