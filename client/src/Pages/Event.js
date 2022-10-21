import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Event.scss';
import Map from '../components/Event/Map';
import { MdPlace } from 'react-icons/md';
import { FcCalendar,FcClock } from 'react-icons/fc'
import {FaWonSign} from 'react-icons/fa';
// import {BsFillBookmarkHeartFill} from 'react-icos/bs'


const EVENT_PAGE = "http://localhost:8000/event";

const Event = () => {
    
    const navigate = useNavigate();
    const { state } = useLocation();

    const [filter, setFilter] = useState({
        city: state,
        type: '전체',
        date: ''
    });
    const [data, setData] = useState([]);
    const [address, setAddress] = useState("");

    const select_city = useRef();
    const select_type = useRef();
    const date = useRef();

    // 도시 정보로 데이터 가져오기
    const getData = async () => {
        const response = await axios.get(EVENT_PAGE, {
            params: {city: filter.city, type: filter.type, date: filter.date}
        })
        setData(response.data);

    }

    // 필터링 정보가 바뀌었을 때
    const onChange = (e) => {
        // navigate('/event?city=' + e.target.value, {state: e.target.value});
        setFilter({...filter, [e.target.name]: e.target.value,});
    }
    
    // 클릭한 이벤트 주소 받아오기
    const getAddress = async (id) => {
        let response = await axios.get(EVENT_PAGE + "/address", {
            params: {id : id}
        })
        setAddress(response.data.address);
    }

    useEffect(() => {
        console.log( filter );
        getData();
        const select = select_city.current;
        const len = select.options.length;
        // for (let i=0; i<len; i++) {
        //     if (select.options[i].value == city) {
        //         select.options[i].selected = true;
        //     }
        // }
    }, [filter, address])

    return (

        // <div style={{ width: "50%", margin: "100px auto 0 auto", display: "flex", gap: "50px"}}>
        <div style={{ width: "70%", margin: "100px auto 0 auto", display: "flex", gap: "50px", justifyContent: 'center'}}>
            <div style={{width:'100%',position:'relative'}}>
                <Map filter={filter} address={address} />
            </div>
            <div style={{width:'100%', position:'relative'}}>
                <select name="city" onChange={onChange} ref={select_city}>
                    <option value="전체">전체</option>
                    <option value="강남구">강남구</option>
                    <option value="종로구">종로구</option>
                    <option value="영등포구">영등포구</option>
                </select>


                <select name="type" onChange={onChange} ref={select_type}>
                    <option value="전체">전체</option>
                    <option value="축제">축제</option>
                    <option value="공연">공연</option>
                    <option value="콘서트">콘서트</option>
                    <option value="박람회">박람회</option>
                    <option value="전시">전시</option>
                </select>
                
                <input type="date" name="date" onChange={onChange} ref={date}></input>

                {data.map((data) => {
                    return (
                        <div key={data.id} className='list_entire_section'>
                            <div className='list_entire_layout'>
                                <div className='list_desc_layout'>
                                    
                                    <div className='list_name_layout'>
                                        <div className='list_name_title'>
                                            <div className='title'>{data.title}</div>
                                        </div>
                                        <p className='list_name_detail'>{data.detail}</p>
                                    </div>
                                    <div style={{display:'flex', alignItems:'center'}}>
                                        <div style={{width:'80%'}}>
                                            <p className='list_place'><MdPlace style={{color:'red', marginRight:'5px'}}/>{data.place}</p>
                                            <div className='list_period_layout'>
                                                <div><FcCalendar style={{marginRight: '5px'}}/></div>
                                                <div className='list_period_start'>{data.start_date} </div>
                                                <div> ~ </div>
                                                <div className='list_period_end'> {data.end_date}</div>
                                            </div>
                                            <div className='list_time_layout'>
                                                <div><FcClock style={{marginRight: '5px'}}/></div>
                                                <div className='list_period_time'>{data.time}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button className='goMap' type="button" onClick={() => {getAddress(data.id)}}>지도로가기</button>
                                    
                                    <div className='Btns'>
                                        <button className='goView' type="button">상세보기</button>
                                        <button className='likes'>좋아요버튼부분</button>
                                    </div>
                                    
                                </div>

                                <div className='list_img_layout'>
                                    <div style={{width:'100%'}}>
                                        <p className='list_img_type'><span>{data.type}</span></p>
                                        {/* <div className='list_price_layout'> */}
                                        {data.price == '무료' ? <p className='list_price_free'>무료</p> : null }
                                        {/* </div> */}
                                        <img src={"./img/" + data.filename} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Event;