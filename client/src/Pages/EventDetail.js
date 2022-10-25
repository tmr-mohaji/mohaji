import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetail.scss';
import Modal from '../components/Modal/Modal';
import axios from 'axios';

const DETAIL_PAGE = "http://localhost:8000/event/";
const SCHEDULE_URL = "http://localhost:8000/schedule/addEvent";

const EventDetail = (props) => {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [date, setDate] = useState("");
    const modal = useRef();

    const getData = async () => {
        const response = await axios.get(DETAIL_PAGE + id, {
            params: { id: id }
        });
        setData(response.data);
    }

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

    const closeModal = async () => {
        if (date == "") {
            alert("날짜 선택 안됨");
        } else {
            let result = await axios.post(SCHEDULE_URL, {user_id : props.user_id, event_id : id, date : date});
            alert(result.data);
            closeBtn();
        }
    }

    const closeBtn = () => {
        modal.current.classList.add("d-none");
    }

    useEffect(() => {
        getData();
    }, [])

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
                        <div className='d_tit'>
                            <h1>{data.title}</h1>
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
                            <button type="button" className="bg-black_r w1">
                                <span className="ico-stars">즐겨찾기</span>
                            </button>

                            <button type="button" className="bg-black w2" onClick={showModal}>
                                <span className='ico-stars2'>마이페이지</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='line_box'></div>

                <div className='d_box2'>
                    
                </div>
            </div>
            <div ref={modal} className="d-none">
                <Modal onChange={getDate} onClick={closeModal} closeBtn={closeBtn}/>
            </div>
        </section>
    )
}

export default EventDetail;