import { useRef } from 'react';
import axios from 'axios';

const BACK_SERVER = "http://localhost:8000";

function FindId_Code (props) {

    const codeInput = useRef();

    const findId = async () => {

        if (codeInput.current.value == props.code) {
            const idResult = await axios.post(BACK_SERVER + "/user/findId", {email: props.input.current.value});
            const id = idResult.data.id;

            if (id == null) {
                console.log("존재하지 않는 아이디");
            } else {
                console.log(id.id);
            }

        } else {
            console.log("인증 실패");
        }
    }


    return (
        <div className='findId_section'>
            <input className='code_input' type="text" name="code" placeholder="인증코드 5자리를 입력해주세요." ref={codeInput} />
            <button className='findBtn' type="button" onClick={findId}>아이디 찾기</button>
        </div>
    )
}

export default FindId_Code;