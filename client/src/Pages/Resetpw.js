import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const USER_URL = "http://localhost:8000/user/resetPW"

function Resetpw() {

    // const [ check, setCheck ] = useState(id);
    const location = useLocation();
    const id = location.state.id;
    const email = location.state.email;
    const input = useRef();

    const changePW = async () => {
        const result = await axios.post(USER_URL, {id: id, password: input.current.value});
    }

    return(
        <>
            <div style={{marginTop:'200px', minHeight:'100vh'}}>
                <input value={email} readOnly></input><br />
                <input value={id} readOnly></input><br />
                <input type='password' placeholder='비밀번호' name="password" required ref={input}></input><br />
                <input type='password' placeholder='비밀번호 확인' name="password" required></input><br />
                <button type='button' onClick={changePW}>변경</button>
            </div>
        </>
    )
}

export default Resetpw;