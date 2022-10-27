import { useRef, useState } from 'react';
import './ReviewForm.scss';

const ReviewForm = (props) => {

    const score = useRef();
    const file = useRef();
    const img = useRef();

    const [isDrop, setIsDrop] = useState(false);

    const dropBtn = () => {
        setIsDrop(isDrop => !isDrop);
    }


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

    // 선택한 평점을 화면에 보여주기 위해 정의
    const selectBoxElements = document.querySelectorAll(".select");

    function selectOption(optionElement) {
        const selectedElement = document.querySelector(".selected-value");
        selectedElement.innerHTML = optionElement.innerHTML;
    }

    // 임시로 addEventListener 사용... React에서는 최대한 사용 자제 해야함
    selectBoxElements.forEach(selectBoxElement => {
        selectBoxElement.addEventListener("click", function (e) {
            const targetElement = e.target;
            const isOptionElement = targetElement.classList.contains("option_box");

            if (isOptionElement) {
                selectOption(targetElement);
            }
        });
    });



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

                <div className={isDrop ? 'select' : 'select active'} onClick={dropBtn}>
                    <div className="selected">
                        <div className="selected-value">리뷰</div>
                        <div className="arrow"></div>
                    </div>
                    <ul className='drop_ul'>
                        <li>
                            <div className='option_box'>
                                <span className="star">
                                    ★★★★★ <span className='one'>★★★★★</span>
                                </span>
                                <p className='start_txt'>아주 좋아요</p>
                            </div>
                        </li>

                        <li>
                            <div className='option_box'>
                                <span className="star">
                                    ★★★★★ <span className='two'>★★★★★</span>
                                </span>
                                <p className='start_txt'>맘에 들어요</p>
                            </div>
                        </li>

                        <li>
                            <div className='option_box'>
                                <span className="star">
                                    ★★★★★ <span className='three'>★★★★★</span>
                                </span>
                                <p className='start_txt'>보통 이에요</p>
                            </div>
                        </li>

                        <li>
                            <div className='option_box'>
                                <span className="star">
                                    ★★★★★ <span className='four'>★★★★★</span>
                                </span>
                                <p className='start_txt'>그냥 그래요</p>
                            </div>
                        </li>

                        <li>
                            <div className='option_box'>
                                <span className="star">
                                    ★★★★★ <span className='five'>★★★★★</span>
                                </span>
                                <p className='start_txt'>별로에요</p>
                            </div>
                        </li>

                    </ul>
                </div>


                <button className='review_submit' onClick={props.onClick}>등록</button>
            </div>
        </div>
    )
}

export default ReviewForm;