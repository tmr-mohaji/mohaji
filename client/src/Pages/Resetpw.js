import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Resetpw.scss';

function Resetpw() {

const [resetText, setResetText] = useState();
const [ resetWarning, setResetWarning ] = useState();

const resetPW = useRef();
const resetPWCheck = useRef();

const navigate = useNavigate();
const location = useLocation();

const id = location.state.id;
const email = location.state.email;

const ResetOnChange = (e) => {

    const button_click = document.querySelector('.reset_btn');

    if (resetPW.current.value != e.target.value ) {
        setResetWarning('reset_warning');
        setResetText('비밀번호가 다릅니다.');
        button_click.disabled = true;
        button_click.style.cursor = 'not-allowed';
    } else {
        setResetWarning('reset_checking');
        setResetText('비밀번호가 같습니다.');
        button_click.disabled = false;
        button_click.style.cursor = 'pointer';
    }
}

    const changePW = async () => {
        const result = await axios.post(process.env.REACT_APP_USER_URL + "/resetPW", {id: id, password: resetPW.current.value});
        if ( result.status == 200 ) { 
            alert("비밀번호가 성공적으로 변경되었습니다.");
            navigate('/user/login');
        }
    }

    return(
        <>
        <div className='reset_entire_layout'>
            <div className='reset_section'>
            <form className='reset_form'>
                <h1 style={{marginBottom:'50px'}}>로고</h1>
                <div className={resetWarning} style={{height:'40px', marginBottom:'20px'}}>{resetText}</div>
                <input className='reset_email' style={{fontWeight:'700'}} value={email} readOnly></input><br />
                <input className='reset_id' style={{fontWeight:'700'}} value={id} readOnly></input><br />
                <input className='reset_pw' type='password' placeholder='비밀번호' name="password" ref={resetPW} required></input><br />
                <input className='reset_pw_check' type='password' placeholder='비밀번호 확인' name="password" onChange={ResetOnChange} ref={resetPWCheck} required></input><br />
                <button className='reset_btn' type='button' onClick={changePW}>비밀번호 변경</button>     
            </form>
            </div>          
        </div>
        </>
    )
}

export default Resetpw;