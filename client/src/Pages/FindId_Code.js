import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function FindId_Code (props) {

    const [ userId , setUserId ] = useState();
    const [ userEmail, setUserEmail ] = useState();
    const [ find , setFind ] = useState(false);

    const navigate = useNavigate();

    const codeInput = useRef();

    const findId = async () => {

        if (codeInput.current.value == props.code) {
            const idResult = await axios.post(process.env.REACT_APP_USER_URL + "/findId", {email: props.input.current.value});
            const id = idResult.data.id;

            if (id == null) {
                props.setText('존재하지 않는 아이디');

            } else {
                console.log(id.id);
                setFind(true);
                setUserEmail(props.input.current.value);
                setUserId(id.id);
                props.setText('인증 완료!');
            }

        } else {
            props.setText('인증 실패!');
        }
    }


    return (
        <div className='findId_section'>
            {
                find == false ? 
            (<div><input className='code_input' type="text" name="code" placeholder="인증코드 5자리를 입력해주세요." ref={codeInput} />
            <button className='findBtn' type="button" onClick={findId}>아이디 찾기</button></div>) 
            : 
            (<div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                {/* <p style={{color:'red', fontSize:'13px'}}>인증완료!</p> */}
                <p className='userIdText' style={{fontSize:'13px', marginBottom:'10px'}}>고객님의 아이디는 <span style={{color:'blue',fontSize:'18px', margin:'10px', fontWeight:'700'}}>{userId}</span>입니다.</p>
                <div>
                    <button className='goLogin' onClick={() => navigate('/user/login')}>로그인하러가기</button>
                    <button className='goReset' onClick={() => navigate('/user/resetpw', { state: { id: userId , email: userEmail }})}>비밀번호 재설정</button>
                </div>
            </div> )
            }
        </div>
    )
}

export default FindId_Code;