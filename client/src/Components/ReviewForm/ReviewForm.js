import { useRef, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './ReviewForm.scss';

import down_arrow from './img/down_ar.png';

const ReviewForm = (props) => {

    const score = useRef();
    const file = useRef();
    const img = useRef();

    const [dropdownVisibility, setDropdownVisibility] = useState(false);

    // const drawStar = () => {
    //     document.querySelector('.star span').style.width = `${score.current.value * 20}%`;
    // }


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
            img_tag.src = "/img/no_image3.png";
        }
    }



    return (
        <div className='review_Container'>
            <div className='reviewBox1'>
                {/* <textarea name="comment" onChange={props.onChange}></textarea> */}
                <p className='review_tit'>리뷰 <span className='review_line'>|</span> <span className='review_tit2'>공연 후기를 작성하실 수 있습니다.</span></p>

                <div className='rt_box'>
                    <textarea name="comment" className="tf_write" onChange={props.onChange}></textarea>
                    <label className='tf_label' for="img">
                        <img src="/img/no_image3.png" style={{ width: "40px", height: "33px" }} ref={img} alt='' />
                        <p className='img_p'>+ 사진추가</p>
                    </label>
                    <input type="file" id="img" onChange={() => { imgPreview(); props.fileUpload() }} hidden ref={file} />
                </div>
            </div>

            <div className='reviewBox2'>
                {/* <span className="star">
                    ★★★★★ <span>★★★★★</span>
                    <input type="range" name="score" value="3" min="0" max="5" step="0.5" onInput={drawStar} ref={score} onChange={props.onChange} />
                </span> */}

                <div className='drop_box'>
                    <button className='review_star' onClick={e => setDropdownVisibility(!dropdownVisibility)}>
                        {
                            dropdownVisibility ? '리뷰' : '리뷰'
                        }

                        <img src={down_arrow} alt='' />
                    </button>
                    <Dropdown visibility={dropdownVisibility}>
                        <ul className='drop_ul'>
                            <li>                               
                                <span className="star">
                                    ★★★★★ <span className='one'>★★★★★</span>
                                </span>
                                <p className='start_txt'>아주 좋아요</p>
                            </li>

                            <li>
                                <span className="star">
                                    ★★★★★ <span className='two'>★★★★★</span>
                                </span>
                                <p className='start_txt'>맘에 들어요</p>
                            </li>

                            <li>
                                <span className="star">
                                    ★★★★★ <span className='three'>★★★★★</span>
                                </span>
                                <p className='start_txt'>보통 이에요</p>
                            </li>

                            <li>
                                <span className="star">
                                    ★★★★★ <span className='four'>★★★★★</span>
                                </span>
                                <p className='start_txt'>그냥 그래요</p>
                            </li>

                            <li>
                                <span className="star">
                                    ★★★★★ <span className='five'>★★★★★</span>
                                </span>
                                <p className='start_txt'>별로에요</p>
                            </li>

                        </ul>
                    </Dropdown>
                </div>


                <button className='review_submit' onClick={props.onClick}>등록</button>
            </div>
        </div>
    )
}

export default ReviewForm;