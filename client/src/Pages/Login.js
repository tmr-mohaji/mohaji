import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.scss';
import axios from 'axios';

const USER_URL = "http://localhost:8000/user/login"

const Login = ( props ) => {

    const form = useRef();
    const navigate = useNavigate();

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
            window.localStorage.setItem("access_token", response.data.token );
            navigate("/");
        } else {
            console.log("실패");
        }
    }

    return(
        <div className='login_entire_layout'>
            <div>
                <form ref={form}>
                    <input type="text" placeholder="아이디" name="id" required/> <br />
                    <input type="password" placeholder="비밀번호" name="password" required/> <br />
                    <button type="button" onClick={login}>로그인</button>
                </form>
            </div>
            <div>
                <div><Link to="/user/findid">아이디 찾기</Link></div>
                <div><Link to="/user/resetpw">비밀번호 재설정</Link></div>
            </div>
        </div>
    )
}

export default Login;