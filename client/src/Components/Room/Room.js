const Room = (props) => {
    return(
        <div className="chatRoom">
            <h1>{props.roomName}</h1>
            <div style={{height: "200px"}}></div>
            <input type="text" onChange={props.onChange}/>
            <button onClick={props.onClick}>전송</button>
        </div>
    )
}

export default Room;