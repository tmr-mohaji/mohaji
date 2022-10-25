import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Event.scss';

import Map from '../components/Event/Map';
import dateData from './Date.json';
import { MdPlace } from 'react-icons/md';
import { FcCalendar,FcClock } from 'react-icons/fc'
import {FaHeart} from 'react-icons/fa'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import GPS from './img/gps.png';

const EVENT_PAGE = "http://localhost:8000/event";

const Event = (props) => {

    const navigate = useNavigate();

    const [filter, setFilter] = useState({
        city: '전체',
        type: '전체',
        date: ''
    });

    const [eventData, setEventData] = useState([]);
    const [address, setAddress] = useState("");
    const [clickData, setClickData] = useState([]);
    const [render, setRender] = useState(false);

    const select_city = useRef();
    const select_type = useRef();
    const select_date = useRef();
    const heart = useRef();

    // select box 설정
    const [city, setCity] = useState('');
    const [type, setType] = useState('');
    //달력 정보
    const [calendar, setCalendar] = useState(null);

    // city, type, date 선택시 필터링 적용
    const handleChange_city = (event) => {
        setCity(event.target.value);
        setFilter({...filter, [event.target.name]: event.target.value,});
        // console.log(filter);
    };

    const handleChange_type = (event) => {
        setType(event.target.value);
        setFilter({...filter, [event.target.name]: event.target.value,});
        // console.log(filter);
    };
    
    const handleChange_date = (event) => {

        let pickDate = String(event.$d).split(" ");
        let month = dateData.date[0][[pickDate[1]]];

        setCalendar(pickDate[3]+ '-' + month + '-' + pickDate[2]);
        setFilter({...filter, date : pickDate[3]+ '-' + month + '-' + pickDate[2] });
    };

    // 필터 정보로 데이터 가져오기
    const getData = async () => {

        const response = await axios.get(EVENT_PAGE, {
            params: {city: filter.city, type: filter.type, date: filter.date}
        })

        // 로그인 상태
        if ( props.id != "" ) {
            let ls = [];
            for(let i=0; i<response.data.length; i++) {

                let result = await axios.post(EVENT_PAGE + "/likeInfo", {user_id: props.id, event_id: response.data[i].id});

                if (result.data != "") {
                    ls.push(true);
                } else {
                    ls.push(false);
                }
            }
            let event = [];
            for (let i=0; i<response.data.length; i++) {
                response.data[i]['like'] = ls[i];
                event.push(response.data[i]);
            }
            setEventData(event);
        // 비로그인 상태
        } else {
            let ls = [];
            for(let i=0; i<response.data.length; i++) {
                ls.push(false);
            }
            let event = [];
            for (let i=0; i<response.data.length; i++) {
                response.data[i]['like'] = ls[i];
                event.push(response.data[i]);
            }
            setEventData(event);
        }
    }

    // 클릭한 이벤트 주소 받아오기
    const getAddress = async (id) => {
        let response = await axios.get(EVENT_PAGE + "/address", {
            params: {id : id}
        })
        setAddress(response.data.address);
        setClickData(response.data);
    }

    // 좋아요 버튼 설정
    const LikeIt = (id) => {
        if ( localStorage.getItem("access_token") != undefined ) {
            const heartIcon = heart.current.querySelector("svg");
            axios({
                url: 'http://localhost:8000/user/auth',
                headers: {
                    'Authorization': localStorage.getItem("access_token")
                }
            }).then( (result) => {
                console.log("unliked 포함: ", heartIcon.classList.contains('unliked'));
                if (heartIcon.classList.contains('unliked')) {
                    console.log('like');
                    heartIcon.classList.remove('unliked');
                    console.log("false 나와야 함", heartIcon.classList.contains('unliked'));
                    axios.post(EVENT_PAGE + "/like", {user_id : result.data.id, event_id : id});
                    // setRender(true);
                } else {
                    console.log("dislike");
                    heartIcon.classList.add('unliked');
                    console.log("true 나와야 함", heartIcon.classList.contains('unliked'));
                    axios.post(EVENT_PAGE + "/dislike", {user_id : result.data.id, event_id : id});
                    // setRender(false);
                }
            });
        } else {
            alert("로그인 후 이용가능");
        }
        
    }

    useEffect(() => {
        getData();
    }, [filter, address, props.id, render])

    return (
        <div className="totalSection">
            <div className='mapSection'>
                <Map filter={filter} address={address} clickData={clickData}/>
            </div>
            <div className='descSection'>
                <div className='searchControllSection'>
                        <div className='searchControll'>
                            <select
                                value={city}
                                label="city"
                                onChange={handleChange_city}
                                ref={select_city}
                                name='city'
                                className='SelectCity'
                            >
                                <option value="" disabled selected>Region</option>
                                <option value='전체' className='option'>전체</option>
                                <option value='강남구' className='option'>강남구</option>
                                <option value='종로구' className='option'>종로구</option>
                                <option value='영등포구' className='option'>영등포구</option>
                            </select>

                            <select
                                value={type}
                                label="type"
                                onChange={handleChange_type}
                                ref={select_type}
                                name='type'
                                className='SelectType'
                            >
                                <option value="" disabled selected>Type</option>
                                <option value='전체' className='option'>전체</option>
                                <option value='축제' className='option'>축제</option>
                                <option value='공연' className='option'>공연</option>
                                <option value='콘서트' className='option'>콘서트</option>
                                <option value='박람회' className='option'>박람회</option>
                                <option value='전시' className='option'>전시</option>
                            </select>
                        
                        <div style={{width:'40%',margin:'0 10px'}} className='datepicker'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={calendar}
                                onChange={handleChange_date}
                                ref={select_date}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            </LocalizationProvider>
                        </div><br />
                        </div>
                    </div>
                

                <div className='listSection'>
                {eventData.map((data) => {
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
                                    <div className='eventInfo'>
                                        <div style={{width:'100%'}}>
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
                                    <div className='Btns'>
                                        {/* <div style={{textAlign:'right',marginBottom:'10px'}}>
                                                <button className='goMap' type="button" onClick={() => {getAddress(data.id)}}><img src={GPS} style={{width:'30px',height:'30px'}}/></button> */}
                                        
                                        <button className='goView' type="button" onClick={() => { navigate('/event/'+ data.id); }}>상세보기</button>
                                        <button className='likes' onClick={() => {LikeIt(data.id)}} ref={heart}>
                                            {data.like ? <FaHeart /> : <FaHeart className="unliked" />}
                                        </button>
                                        <button className='goMap' type="button" onClick={() => {getAddress(data.id)}}><img src={GPS} style={{width:'30px',height:'30px'}}/></button>
                                    </div>
                                    
                                </div>

                                <div className='list_img_layout'>
                                    <div style={{width:'100%'}}>
                                        <p className='list_img_type'><span>{data.type}</span></p>
                                        {data.price == '무료' ? <p className='list_price_free'>무료</p> : null }
                                        <img src={"./img/" + data.filename} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default Event;