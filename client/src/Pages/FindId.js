import { useState } from 'react';
import axios from 'axios';

const FindId = () => {

    const [email, setEmail] = useState('');

    const sendEmail = async () => {
        console.log(email);
        let result = await axios.post("http://localhost:8000/email", {email});
        console.log(result);
    }

    return (
        <div style={{marginTop: "100px"}}>
            <input type="text" name="email" placeholder="이메일"></input>
            <button onClick={sendEmail}>아이디 찾기</button>
        </div>
    )
}

export default FindId;