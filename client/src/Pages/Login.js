import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

// import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';

const Login = ( props ) => {

    const [warning, setWarning] = useState('');

    const form = useRef();
    const Id = useRef();
    const PW = useRef();

    const navigate = useNavigate();

    const error = () => toast('아이디 또는 비밀번호를 확인해주세요!', { autoClose:3000, hideProgressBar:true, progress:undefined});

    const login = async () => {

        let result = form.current.checkValidity();

        if ( !result ) {
            form.current.reportValidity();
            return false;
        }

        const response = await axios.post(process.env.REACT_APP_USER_URL + "/login", {
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
            Id.current.value = '';
            PW.current.value='';

            setTimeout(() => {
                setWarning('');
            },3000);
        }
    
    }

    return(
        <>
        <div className='login_entire_layout'>
            <div className='login_section'>
                <form ref={form} className='login_form'>
                    <h1 style={{marginBottom:'50px'}}>로고</h1>
                    <div className='warningText' style={{height:'40px', marginBottom:'20px'}}>{warning}</div>
                    <input ref={Id} className='login_id' type="text" placeholder="아이디" name="id" required/>
                    <input ref={PW} className='login_pw' type="password" placeholder="비밀번호" name="password" required/>
                    <button className='login_btn' type="button" onClick={login}>로그인</button>

                    <hr />
                    <div className='kakaoLogin'><a href="http://localhost:8000/auth/kakao"><img src='/img/kakao_login.png' style={{width:'130px', cursor:'pointer'}}></img></a></div>
                </form>
                
                <div className='login_etc'>
                    <Link className='find_id' to="/user/findid">아이디 찾기</Link>
                    <span style={{fontSize:'10px', color:'rgba(170,170,170,0.3)'}}>|</span>
                    <Link className='set_pw' to="/user/findid">비밀번호 재설정</Link>
                    <span style={{fontSize:'10px', color:'rgba(170,170,170,0.3)'}}>|</span>
                    <Link className='signup' to="/user/signup">회원가입</Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;