import './Modal.scss';

const Modal = (props) => {

    const style = {
        backgroundColor: "black",
        width: "200px",
        height: "100px",
        position: "absolute",
        textAlign: "center",
        top: "300px",
        zIndex: "10",
        paddingTop: "40px",
        marginLeft: "40%"
    };

    return(
        <div style={style}>
            <input type="date" onChange={props.onChange}/>
            <button onClick={props.closeBtn}>닫기</button>
            <button onClick={props.onClick}>확인</button>
        </div>
    )
}

export default Modal;