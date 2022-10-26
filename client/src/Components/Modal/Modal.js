import './Modal.scss';
import { useEffect, useRef } from 'react';

const Modal = (props) => {
    const input = useRef();

    useEffect(() => {
        input.current.click();
    }, []);
    return(
        <div className='modalBox'>
            <input type="date" ref={input} onChange={props.onChange}  />
            <button onClick={props.closeBtn}>닫기</button>
            <button onClick={props.onClick}>확인</button>
        </div>
    )
}

export default Modal;