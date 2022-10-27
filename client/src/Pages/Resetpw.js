import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Resetpw.scss';
import axios from 'axios';

const USER_URL = "http://localhost:8000/user/resetPW"

function Resetpw() {

  const [resetText, setResetText] = useState();
  const [ resetWarning, setResetWarning ] = useState();
  const resetPW = useRef();
  const resetPWCheck = useRef();

  // const [ check, setCheck ] = useState(id);
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
    }else {
      setResetWarning('reset_checking');
      setResetText('비밀번호가 같습니다.');
      button_click.disabled = false;
      button_click.style.cursor = 'pointer';
    }
  }
  
  const navigate = useNavigate();
  const changePW = async () => {
        const result = await axios.post(USER_URL, {id: id, password: resetPW.current.value});

        if ( result.status == 200 ) { navigate('/') }
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