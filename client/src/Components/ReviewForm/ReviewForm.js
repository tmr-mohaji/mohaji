import { useRef } from 'react';
import './ReviewForm.scss';

const ReviewForm = (props) => {

    const score = useRef();
    const file = useRef();
    const img = useRef();

    const drawStar = () => {
        document.querySelector('.star span').style.width = `${score.current.value * 20}%`;
    }

    const imgPreview = () => {
        let file_tag = file.current;
        let img_tag = img.current;

        if (file_tag.files.length > 0) {
            let reader = new FileReader();

            reader.onload = function(data) {
                img_tag.src = data.target.result;
            }
            reader.readAsDataURL(file_tag.files[0]);
        } else {
            img_tag.src = "/img/no_image.png";
        }
    }

    return (
        <div>
            <span className="star">
                ★★★★★ <span>★★★★★</span>
                <input type="range" name="score" value="3" min="0" max="5" step="0.5" onInput={drawStar} ref={score} onChange={props.onChange}/>
            </span> <br />
            <textarea name="comment" onChange={props.onChange}></textarea>
            <button onClick={props.onClick}>등록</button>
            <label for="img">
                <img src="/img/no_image.png" style={{width: "200px", height: "200px"}} ref={img}/>
            </label>
            <input type="file" id="img" onChange={() => {imgPreview(); props.fileUpload()}} hidden ref={file}/>
        </div>
    )
}

export default ReviewForm;