import { useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';

const ChatInput = (props) => {

    const input = useRef();

    const emoji = (emoji) => {
        input.current.value += emoji.emoji;
        // input.current.focus();
    }

    useEffect(() => {
        // document.querySelector(".EmojiPickerReact .Flex").style.display = "none";
        input.current.focus();
    }, []);

    return (
        <div className='chat_write'>
            <form>
                <input className='chat_input' type="text" onChange={props.onChange} ref={input}/>
                <button className='chat_btn' type="button" onClick={props.sendMsg}>전송</button>
            </form>
            {/* <EmojiPicker height={300} width={300} searchDisabled="true" onEmojiClick={emoji}/> */}
        </div>
    )
}

export default ChatInput;