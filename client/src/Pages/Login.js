import { useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const USER_URL = "http://localhost:8000/user/login"

const Signup = () => {

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
            console.log("성공");
            window.localStorage.setItem("access_token", response.data.token );
            // navigate("/");
        } else {
            console.log("실패");
        }
    }

    const check = async () => {

        axios({
            url: 'http://localhost:8000/user/auth',
            headers: {
                'Authorization': localStorage.getItem("access_token")
            }
        }).then((result) => {
            console.log( result.data );
        });
    }

    return(
        <div style={{paddingTop: "100px"}}>
            <form ref={form}>
                <input type="text" placeholder="아이디" name="id" required/> <br />
                <input type="password" placeholder="비밀번호" name="password" required/> <br />
                <button type="button" onClick={login}>로그인</button>
            </form>
            <button onClick={check}>확인</button>
            <Link to="/user/findid">아이디 찾기</Link>
            <Link to="/user/resetpw">비밀번호 재설정</Link>
        </div>
    )
}

export default Signup;