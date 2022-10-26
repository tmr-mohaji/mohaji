import './Modal.scss';

const Modal = (props) => {


    return(
        <div className='modalBox'>
            <input type="date" onChange={props.onChange}/>
            <button onClick={props.closeBtn}>닫기</button>
            <button onClick={props.onClick}>확인</button>
        </div>
    )
}

export default Modal;