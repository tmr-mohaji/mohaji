import { useState,useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';
import axios from 'axios';

const USER_URL = "http://localhost:8000/user/login"

const Login = ( props ) => {

    const [warning, setWarning] = useState('');
    const form = useRef();
    const navigate = useNavigate();

    const error = () => toast('아이디 또는 비밀번호를 확인해주세요!', { autoClose:3000, hideProgressBar:true, progress:undefined,})

    const login = async () => {

        let result = form.current.checkValidity();

        if ( !result ) {
            form.current.reportValidity();
            return false;
        }

        const response = await axios.post(USER_URL, {
            id : form.current.id.value,
            password : form.current.password.value
        })

        const isLogin = response.data.isLogin;

        if (isLogin) {
            props.setNickname( response.data.nickname );
            props.setId( form.current.id.value );
            window.localStorage.setItem("access_token", response.data.token );
            navigate("/");
        } else {
            console.log("실패");
            error();
            setWarning(<ToastContainer />);
            setTimeout(() => {
                setWarning('');
            },3000);
        }
    }

    return(
        <div className='login_entire_layout'>
            <div className='login_section'>
                <form ref={form} className='login_form'>
                    <h1>로고 넣을지 말지</h1>
                    <div style={{height:'40px'}}>{warning}</div>
                    <input className='login_id' type="text" placeholder="아이디" name="id" required/>
                    <input className='login_pw' type="password" placeholder="비밀번호" name="password" required/>
                    <button className='login_btn' type="button" onClick={login}>로그인</button>

                    <hr />
                    <div className='kakaoLogin'><img src='/img/kakao_login.png' style={{width:'130px', cursor:'pointer'}}></img></div>
                </form>
                
                <div className='login_etc'>
                    <Link className='find_id' to="/user/findid">아이디 찾기</Link>
                    <span style={{fontSize:'10px', color:'rgba(170,170,170,0.3)'}}>|</span>
                    <Link className='set_pw' to="/user/resetpw">비밀번호 재설정</Link>
                    <span style={{fontSize:'10px', color:'rgba(170,170,170,0.3)'}}>|</span>
                    <Link className='signup' to="/user/signup">회원가입</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;