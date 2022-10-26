import './Modal.scss';
import { useEffect, useRef } from 'react';

const Modal = (props) => {
    const input = useRef();

    useEffect(() => {
        input.current.click();
    }, []);

    
    return(
        <div className='modalBox'>
            <input className='mb_input' type="date" ref={input} onChange={props.onChange}  />
            <button className='close_btn1' onClick={props.closeBtn}><span className="ico-stars2">닫기</span></button>
            <button className='ok_btn1' onClick={props.onClick}><span className="ico-stars">확인</span></button>
        </div>
    )
}

export default Modal;