import { useRef } from 'react';
import './ReviewForm.scss';

const ReviewForm = (props) => {

    const score = useRef();

    const drawStar = () => {
        document.querySelector('.star span').style.width = `${score.current.value * 20}%`;
    }

    return (
        <div>
            <span className="star">
                ★★★★★ <span>★★★★★</span>
                <input type="range" name="score" value="3" min="0" max="5" step="0.5" onInput={drawStar} ref={score} onChange={props.onChange}/>
            </span>
            <textarea name="comment" onChange={props.onChange}></textarea>
            <button onClick={props.onClick}>등록</button>
        </div>
    )
}

export default ReviewForm;