import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const USER_URL = "http://localhost:8000/user/"

const Signup = () => {

    const form = useRef();
    const navigate = useNavigate();

    // 아이디 중복 확인
    const idCheck = async (e) => {

        const response = await axios.post(USER_URL + "idCheck", {id : e.target.value});
        const validId = response.data.valid;

        if (e.target.value != "") {
            if (validId == true) {
                console.log("유효한 아이디");
            } else {
                console.log("중복 아이디");
            }
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