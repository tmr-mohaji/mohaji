import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const USER_URL = "http://localhost:8000/user/"

const Signup = () => {
    const form = useRef();
    const navigate = useNavigate();

    const idCheck = async (e) => {
        const response = await axios.post(USER_URL + "idCheck", {id : e.target.value});
        if (e.target.value != "") {
            if (response.data == true) {
                console.log("유효한 아이디");
            } else {
                console.log("중복 아이디");
            }
        }
    }

    const signup = async () => {
        const response = await axios.post(USER_URL + "emailCheck", {
            email : form.current.email.value
        })
        if (response.data == true) {
            const res = await axios.post(USER_URL + "signup", {
                id : form.current.id.value, 
                password : form.current.password.value,
                nickname : form.current.nickname.value, 
                email : form.current.email.value
            });
            alert(form.current.nickname.value + "님 환영합니다.");
            navigate("/user/login");
        } else {
            alert("해당 이메일 아이디 존재");
        }
    }

    return(
        <div style={{paddingTop: "100px"}}>
            <form ref={form}>
                <input type="text" placeholder="닉네임" name="nickname" required/> <br />
                <input type="text" placeholder="아이디" name="id" onChange={idCheck} required/> <br />
                <input type="password" placeholder="비밀번호" name="password" required/> <br />
                <input type="password" placeholder="비밀번호 확인" required/> <br />
                <input type="email" placeholder="이메일" name="email" required/> <br />
                <button type="button" onClick={signup}>회원가입</button>
            </form>
        </div>
    )
}

export default Signup;