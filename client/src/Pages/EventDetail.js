import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetail.scss';
import Modal from '../components/Modal/Modal';
import ReviewForm from '../components/ReviewForm/ReviewForm';
import axios from 'axios';

import { FaHeart } from 'react-icons/fa'

const EVENT_URL = "http://localhost:8000/event/";
const SCHEDULE_URL = "http://localhost:8000/schedule/addEvent";
const REVIEW_URL = "http://localhost:8000/review/";

const EventDetail = (props) => {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [date, setDate] = useState("");
    const [likeStatus, setLikeStatus] = useState("");
    const [reviewData, setReviewData] = useState({
        score: 0,
        comment: ''
    });
    const modal = useRef();
    const navigate = useNavigate();

    const getData = async () => {
        const response = await axios.get(EVENT_URL + id, {
            params: { id: id }
        });
        setData(response.data);
        const likeResult = await axios.post(EVENT_URL + "likeInfo", { user_id: props.user_id, event_id: id });
        if (likeResult.data == "") {
            setLikeStatus(false);
        } else {
            setLikeStatus(true);
        }
    }

    // 좋아요 버튼 설정
    const like = () => {
        if (localStorage.getItem("access_token") != undefined) {

            axios({
                url: 'http://localhost:8000/user/auth',
                headers: {
                    'Authorization': localStorage.getItem("access_token")
                }
            }).then((result) => {
                console.log("work");
                // 좋아요 안 된 상태
                if (!likeStatus) {
                    console.log('like');
                    axios.post(EVENT_URL + "like", { user_id: result.data.id, event_id: id });
                    setLikeStatus(true);
                } else {
                    console.log("dislike");
                    axios.post(EVENT_URL + "dislike", { user_id: result.data.id, event_id: id });
                    setLikeStatus(false);
                }
            });
        } else {
            alert("로그인 후 이용가능");
        }
    }

    // 리뷰 가져오기
    const getReview = (e) => {
        setReviewData({...reviewData, [e.target.name]: e.target.value,});
    }

    let formData = new FormData();

    const fileUpload = () => {
        let fileUpload = document.getElementById("img");

        for (let i=0; i<fileUpload.files.length; i++) {
            formData.append("userfile", fileUpload.files[i]);
        }
    }

    // 리뷰 등록
    const writeComment = async () => {

        if (localStorage.getItem("access_token") != undefined) {

            axios({
                url: 'http://localhost:8000/user/auth',
                headers: {
                    'Authorization': localStorage.getItem("access_token")
                }
            }).then((result) => {
                formData.append('user_id', result.data.id);
                formData.append('event_id', id);
                formData.append('score', reviewData.score);
                formData.append('content', reviewData.comment);

                for (let key of formData.keys()) {
                    console.log(key, ":", formData.get(key));
                }

                axios.post(REVIEW_URL + "writeComment", formData, {
                    headers: {
                        "Contest-Type": "multipart/form-data"
                    }
                }).then(() => {
                    navigate("/event/" + id);
                })
            });
        } else {
            alert("로그인 후 이용가능");
        }
    }

    // 마이페이지 클릭 시 모달 창 설정(비로그인 시)
    const showModal = () => {
        if (props.user_id != "") {
            modal.current.classList.remove("d-none");
        } else {
            alert("로그인 후 이용가능");
        }
    }

    const getDate = (e) => {
        setDate(e.target.value);
    }

    // 마이페이지 클릭 시 모달 창 설정(로그인 시)
    const closeModal = async () => {
        if (date == "") {
            alert("날짜 선택 안됨");
        } else {
            let result = await axios.post(SCHEDULE_URL, { user_id: props.user_id, event_id: id, date: date });
            alert(result.data);
            closeBtn();
        }
    }

    const closeBtn = () => {
        modal.current.classList.add("d-none");
    }

    useEffect(() => {
        getData();
    }, [likeStatus])

    return (
        <section>
            <div className="sub_visual">
                <div className="bg_w">
                    <div className="bg"></div>
                </div>

                <h2 className="sub-t">
                    <strong className="ani">공연일정</strong>
                </h2>
            </div>

            <div className='detailBox'>
                <div className='d_box'>
                    <div className='d_img'>
                        <img className='img_w' src={"/img/" + data.filename} alt='' />
                    </div>

                    <div className='d_info'>
                        <div className='info_first'>
                            <div className='d_tit'>
                                <h1>{data.title}</h1>
                            </div>

                            <div className='d_like'>
                                <button className='like_btn' onClick={like}>
                                    {likeStatus ? <FaHeart /> : <FaHeart style={{ color: "lightgray" }} />}
                                </button>
                            </div>
                        </div>

                        <ul className='d_ul'>
                            <li><span className='d_dt'>기간</span> <span className='r_dt'>{data.start_date} ~ {data.end_date}</span></li>
                            <li><span className='d_dt'>장소</span> <span className='r_dt'>{data.address}, {data.place}</span></li>
                            <li><span className='d_dt'>시간</span> <span className='r_dt'>{data.time}</span></li>
                            <li><span className='d_dt'>장르</span> <span className='r_dt'>{data.type}</span></li>
                            <li><span className='d_dt'>연령</span> <span className='r_dt'>{data.people}</span></li>
                            <li><span className='d_dt'>티켓</span> <span className='r_dt'>{data.price}</span></li>
                            <li><span className='d_dt'>소개</span> <span className='r_dt'>{data.detail}</span></li>
                        </ul>

                        <div className='d_link'>
                            {/* <button type="button" className="bg-black_r w1" onClick={like}>
                                <span className="ico-stars">즐겨찾기</span>
                            </button> */}

                            <button type="button" className="bg-black w2" onClick={showModal}>
                                <span className='ico-stars2'>마이페이지</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='line_box'></div>

                <div className='d_box2'>
                    <ReviewForm onChange={getReview} fileUpload={fileUpload} onClick={writeComment}/>
                </div>
            </div>
            <div ref={modal} className="d-none">
                <Modal onChange={getDate} onClick={closeModal} closeBtn={closeBtn} />
            </div>
        </section>
    )
}

export default EventDetail;