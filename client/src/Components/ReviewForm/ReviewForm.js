import { useRef, useState } from 'react';
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

            reader.onload = function (data) {
                img_tag.src = data.target.result;
            }
            reader.readAsDataURL(file_tag.files[0]);
        } else {
            img_tag.src = "/img/no_image.png";
        }
    }

    return (
        <div>
            <div className='reviewBox1'>
                {/* <textarea name="comment" onChange={props.onChange}></textarea> */}
                <p className='review_tit'>리뷰 <span className='review_line'>|</span> <span className='review_tit2'>공연 후기를 작성하실 수 있습니다.</span></p>

                <div className='rt_box'>
                    <textarea name="comment" className="tf_write" onChange={props.onChange}></textarea>
                    <label className='tf_label' for="img">
                        <img src="/img/no_image.png" style={{ width: "100px", height: "116px" }} ref={img} />
                    </label>
                    <input type="file" id="img" onChange={() => { imgPreview(); props.fileUpload() }} hidden ref={file} />
                </div>
            </div>

            <div className='reviewBox2'>
                <span className="star">
                    ★★★★★ <span>★★★★★</span>
                    <input type="range" name="score" value="3" min="0" max="5" step="0.5" onInput={drawStar} ref={score} onChange={props.onChange} />
                </span>


                {/* <select name="select">
                    <option value="1" selected>
                        <span className='r_star'>★</span> ★★★★
                    </option>
                </select> */}



                <button onClick={props.onClick}>등록</button>
            </div>
        </div>
    )
}

export default ReviewForm;