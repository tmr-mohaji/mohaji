import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";

import Modal from '../components/Modal/Modal';
import ReviewForm from '../components/ReviewForm/ReviewForm';
import Review from '../components/Review/Review';
import KakaoShareButton from './KakaoShareButton';
import './EventDetail.scss';

import { BsShare } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';

const EventDetail = (props) => {

    const { id } = useParams();

    const [data, setData] = useState([]);
    const [date, setDate] = useState("");
    const [likeStatus, setLikeStatus] = useState("");
    const [allReview, setAllReview] = useState([]);
    const [score, setScore] = useState(0);
    const [reviewData, setReviewData] = useState({
        score: 0,
        comment: ''
    });

    const modal = useRef();

    const navigate = useNavigate();

    // 이벤트 & 좋아요 정보
    const getData = async () => {
        const response = await axios.get(process.env.REACT_APP_EVENT_URL + '/' + id, {
            params: { id: id }
        });
        setData(response.data);
        const likeResult = await axios.post(process.env.REACT_APP_EVENT_URL + "/likeInfo", { user_id: props.user_id, event_id: id });
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
                url: process.env.REACT_APP_USER_URL + '/auth',
                headers: {
                    'Authorization': localStorage.getItem("access_token")
                }
            }).then((result) => {
                // console.log("work");
                // 좋아요 안 된 상태
                if (!likeStatus) {
                    // console.log('like');
                    axios.post(process.env.REACT_APP_EVENT_URL + "/like", { user_id: result.data.id, event_id: id });
                    setLikeStatus(true);
                } else {
                    // console.log("dislike");
                    axios.post(process.env.REACT_APP_EVENT_URL + "/dislike", { user_id: result.data.id, event_id: id });
                    setLikeStatus(false);
                }
            });
        } else {
            // alert("로그인 후 이용가능");
            Swal.fire({
                text: '로그인 후 이용가능',
                confirmButtonText: 'OK',
                width: 300,
              })
              .then((res)  => {
                if (res.isConfirmed){
                    navigate('/user/login');
                }
              })
        }
    }

    // 리뷰 데이터
    const findReview = async () => {
        const result = await axios.get(process.env.REACT_APP_REVIEW_URL + "/getComment", {
            params: { event_id: id }
        })

        if (result.data.filename != false) {
            for (let i = 0; i < result.data.result.length; i++) {
                result.data.result[i]['filename'] = result.data.filename[i];
            }
        }

        setAllReview(result.data.result);

        // 별점 계산
        let sum = 0
        for (let i = 0; i < result.data.result.length; i++) {
            // console.log('사람', result.data.result[i]);
            sum += parseFloat(result.data.result[i].score);
        }
        let avg = sum / result.data.result.length;
        if (isNaN(avg)) {
            return false;
        }
        // console.log("score : ", avg);
        setScore(avg);
    }

    // 리뷰 가져오기
    const getReview = (e) => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value, });
    }

    let formData = new FormData();

    const fileUpload = () => {
        let fileUpload = document.getElementById("img");

        for (let i = 0; i < fileUpload.files.length; i++) {
            formData.append("userfile", fileUpload.files[i]);
        }
    }

    // 리뷰 등록
    const writeComment = async (score, content) => {

        if (localStorage.getItem("access_token") != undefined) {

            axios({
                url: process.env.REACT_APP_USER_URL + '/auth',
                headers: {
                    'Authorization': localStorage.getItem("access_token")
                }
            }).then((result) => {
                formData.append('user_id', result.data.id);
                formData.append('event_id', id);
                formData.append('score', score);
                formData.append('content', content);

                for (let key of formData.keys()) {
                    // console.log(key, ":", formData.get(key));
                }

                axios.post(process.env.REACT_APP_REVIEW_URL + "/writeComment", formData, {
                    headers: {
                        "Contest-Type": "multipart/form-data"
                    }
                }).then(() => {
                    let newReview = { score, content };
                    setReviewData({ ...reviewData, newReview });
                    findReview();

                    // 창 비우기
                    let textarea = document.querySelector(".rt_box textarea");
                    let fileUpload = document.getElementById("img_tag");
                    console.log(fileUpload);
                    textarea.value = "";
                    fileUpload.src = "/img/no_image3.png";
                })
            });
        } else {
            // alert("로그인 후 이용가능");
            Swal.fire({
                text: '로그인 후 이용가능',
                confirmButtonText: 'OK',
                width: 300,
              })
              .then((res)  => {
                if (res.isConfirmed){
                    navigate('/user/login');
                }
              })
        }
    }

    // 리뷰 삭제
    const deleteReview = async (review_id) => {
        await axios.delete(process.env.REACT_APP_REVIEW_URL + "/deleteComment", { data: { id: review_id } });
        findReview();
    }

    // 마이페이지 클릭 시 모달 창 설정(비로그인 시)
    const showModal = () => {
        if (props.user_id != "") {
            modal.current.classList.remove("d-none");
        } else {
            // alert("로그인 후 이용가능");
            // navigate("/user/login");
            Swal.fire({
                text: '로그인 후 이용가능',
                confirmButtonText: 'OK',
                width: 300,
              })
              .then((res)  => {
                if (res.isConfirmed){
                    navigate('/user/login');
                }
              })
        }
    }

    const getDate = (e) => {
        setDate(e.target.value);
    }

    // 마이페이지 클릭 시 모달 창 설정(로그인 시)
    const closeModal = async () => {
        if (date == "") {
            // alert("날짜 선택 안됨");
            Swal.fire({
                text: '날짜를 선택해주세요.',
                confirmButtonText: 'OK',
                width: 300,
              })

        } else {
            let result = await axios.post(process.env.REACT_APP_SCHEDULE_URL + "/addEvent", { user_id: props.user_id, event_id: id, date: date });
            // console.log(result.data);
            
            { result.data == true ? (Swal.fire({
                text: '성공적으로 등록되었습니다.',
                confirmButtonText: 'OK',
                width: 300,
              })) : (Swal.fire({
                text: '이벤트 일정을 다시 확인해주세요.',
                confirmButtonText: 'OK',
                width: 400,
              }))}

            closeBtn();
        }
    }

    const closeBtn = () => {
        modal.current.classList.add("d-none");
    }


    useEffect(() => {
        getData();
        findReview();
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
                                <div><KakaoShareButton id={data.id} title={data.title} detail={data.detail} filename={data.filename} /></div>
                                <button className='like_btn' onClick={like}>
                                    {likeStatus ? <FaHeart /> : <FaHeart style={{ color: "lightgray" }} />}
                                </button>
                            </div>
                        </div>

                        <ul className='d_ul'>
                            <li><span className='d_dt'>기간</span> <span className='r_dt'>{data.start_date} ~ {data.end_date}</span></li>
                            <li><span className='d_dt'>장소</span> <span className='r_dt'>{data.address}, {data.place}</span></li>
                            <li><span className='d_dt'>시간</span> <span className='r_dt'>{(data.time || '').split('\\n').map((line) => { return (<span>{line}<br /></span>);})}</span></li>
                            <li><span className='d_dt'>장르</span> <span className='r_dt'>{data.type}</span></li>
                            <li><span className='d_dt'>연령</span> <span className='r_dt'>{data.people}</span></li>
                            <li><span className='d_dt'>티켓</span> <span className='r_dt'>{(data.price || '').split('\\n').map((line) => { return (<span>{line}<br /></span>);})}</span></li>
                            <li><span className='d_dt'>소개</span> <span className='r_dt'>{data.detail}</span></li>
                        </ul>

                        <div className='d_link'>
                            {/* <button type="button" className="bg-black_r w1" onClick={like}>
                                <span className="ico-stars">즐겨찾기</span>
                            </button> */}

                            <button type="button" className="bg-black w2" onClick={showModal}>
                                <span className='ico-stars2'>일정 등록</span>
                            </button>

                            <div ref={modal} className="d-none">
                                <div className='m_box'>
                                    <Modal onChange={getDate} onClick={closeModal} closeBtn={closeBtn} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='line_box'></div>

                <div className='d_box2'>
                    <p className='all_box'><span className='all_txt'>사용자 총 평점</span> <b>{score.toFixed(1)}</b> <b style={{ margin: '0 2.5px' }}>/</b> <b>5.0</b></p>
                    <ReviewForm onChange={getReview} fileUpload={fileUpload} onClick={writeComment} />
                </div>

                <div className='line_box2'></div>

                <div className='review_collector'>
                    <div>
                        <p className='r_re'>사용자 리뷰</p>
                        <hr className='r_hr' style={{ border: "0.5px solid #dadada", width: "100%", marginTop : '10px'}} />
                    </div>

                    {allReview.map((data) => {
                        return (
                            <div key={data.id}>
                                <Review id={data.user_id} score={data.score} review={data.content} date={data.createdAt} file={data.filename} login_id={props.user_id} deleteReview={() => { deleteReview(data.id) }} />
                            </div>
                        )
                    })}
                </div>

                <div className='line_box2'></div>
            </div>
        </section>
    )
}

export default EventDetail;