import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './Signup.scss';

const USER_URL = "http://localhost:8000/user/"

const Signup = () => {

    const [text, setText] = useState();
    const [ warning, setWarning ] = useState();
    const pw = useRef();
    const check_pw = useRef();
    const form = useRef();
    const navigate = useNavigate();

    // 아이디 중복 확인
    const idCheck = async (e) => {

        const response = await axios.post(USER_URL + "idCheck", {id : e.target.value});
        const validId = response.data.valid;

        if (e.target.value != "") {
            if (validId == true) {
                console.log("유효한 아이디");
                setWarning('sign_checking');
                setText('사용가능한 아이디입니다.');
                // setWarningText('유효한 아이디입니다.');
            } else {
                console.log("중복 아이디");
                setWarning('sign_warning');
                setText('중복된 아이디입니다.');
                // setWarningText('중복된 아이디입니다.');
            }
        }
    }

    const onChange = (e) => {
        if (pw.current.value != e.target.value) {
            console.log('되는지?')
            setWarning('sign_warning');
            setText('비밀번호가 다릅니다.');
        } else {
            setWarning('sign_checking');
            setText('비밀번호가 같습니다.');
        }
    }


    // 회원가입
    const signup = async () => {

        let result = form.current.checkValidity();

        if ( !result ) {
            form.current.reportValidity();
            return false;
        }

        const emailCheck = await axios.post(USER_URL + "emailCheck", {
            email : form.current.email.value
        })

        const validEmail = emailCheck.data.valid;

        if (validEmail == true) {

            const response = await axios.post(USER_URL + "signup", {
                id : form.current.id.value, 
                password : form.current.password.value,
                nickname : form.current.nickname.value, 
                email : form.current.email.value
            });
            navigate("/user/login");
            
        } else {
            // alert("해당 이메일 아이디 존재");
            setWarning('sign_warning');
            setText('해당 이메일 아이디가 존재합니다.');
        }
    }


    return(
        <div className='signup_entire_layout'>
            <div className='signup_section'>
                <form ref={form} className='signup_form'>
                    <h1 style={{marginBottom:'50px'}}>로고</h1>
                    <div className={warning} style={{margin:'20px 0', minHeight:'40px'}}>{text}</div>
                    <input className='signup_nickname' type="text" placeholder="닉네임" name="nickname" required/>
                    <input className='signup_id' type="text" placeholder="아이디" name="id" onChange={idCheck} required/>
                    <input ref={pw} className='signup_pw' type="password" placeholder="비밀번호" name="password" required/> 
                    <input ref={check_pw} className='signup_pw_check' type="password" placeholder="비밀번호 확인" onChange={onChange} required/>
                    <input className='signup_email' type="email" placeholder="이메일" name="email" required/>
                    <button className='signup_btn' type="button" onClick={signup}>회원가입</button>
                    <div style={{marginTop:'20px'}}>
                    <button className='goLogin' onClick={() => navigate('/user/login')}>로그인하러가기</button>
                    <button className='goFind' onClick={() => navigate('/user/findid')}>아이디찾기</button>
                </div>
                </form>

            </div>
        </div>
    )
}

export default Signup;