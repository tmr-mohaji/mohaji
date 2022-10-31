import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Event.scss';

import Map from '../components/Event/Map';
import dateData from './Date.json';
import { MdPlace } from 'react-icons/md';
import { FcCalendar,FcClock } from 'react-icons/fc'
import {FaHeart} from 'react-icons/fa'
import {BsStarFill} from 'react-icons/bs'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import GPS from './img/gps.png';

const Event = (props) => {

    const [ pass , setPass ] = useState();

    const navigate = useNavigate();

    const [filter, setFilter] = useState({
        city: '전체',
        type: '전체',
        date: ''
    });

    const [eventData, setEventData] = useState({});
    const [address, setAddress] = useState("");
    const [clickData, setClickData] = useState([]);


    const select_city = useRef();
    const select_type = useRef();
    const select_order = useRef();
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
    };

    const handleChange_type = (event) => {
        setType(event.target.value);
        setFilter({...filter, [event.target.name]: event.target.value,});
    };
    
    const handleChange_date = (event) => {

        let pickDate = String(event.$d).split(" ");
        let month = dateData.date[0][[pickDate[1]]];

        setCalendar(pickDate[3]+ '-' + month + '-' + pickDate[2]);
        setFilter({...filter, date : pickDate[3]+ '-' + month + '-' + pickDate[2] });

    };

    // 필터 정보로 데이터 가져오기
    const getData = async () => {

        const response = await axios.get(process.env.REACT_APP_EVENT_URL, {
            params: {city: filter.city, type: filter.type, date: filter.date}
        })
        // console.log(response.data);
        // 로그인 상태
        if ( props.id != "" ) {
            let ls = [];
            for(let i=0; i<response.data.length; i++) {

                let result = await axios.post(process.env.REACT_APP_EVENT_URL + "/likeInfo", {user_id: props.id, event_id: response.data[i].id});

                if (result.data != "") {
                    ls.push(true);
                } else {
                    ls.push(false);
                }
            }
            
            let event = {};
            for (let i=0; i<response.data.length; i++) {
                response.data[i]['like'] = ls[i];
                event[`id_${response.data[i].id}`] = response.data[i];
            }
            setEventData(event);

        // 비로그인 상태
        } else {
            let ls = [];
            for(let i=0; i<response.data.length; i++) {
                ls.push(false);
            }
            let event = {};
            for (let i=0; i<response.data.length; i++) {
                response.data[i]['like'] = ls[i];
                event[`id_${response.data[i].id}`] = response.data[i];
            }
            setEventData(event);
        }
    }

    // 정렬
    const sortEvent = (mode) => {
        console.log( "sortEvent" );
        console.log( "mode : ", mode );
        const sortable = Object.entries(eventData)
        .sort(([, a], [, b]) => {
            if ( mode == 'title' ) {
                return a[mode].localeCompare(b[mode])
            } else if ( mode == 'avg' ) {
                a[mode] = parseFloat(a[mode]);
                b[mode] = parseFloat(b[mode]);
                return b[mode] - a[mode];
            }
        })
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        
        setEventData(sortable);
    }

    // 정렬 select box
    const orderBy = () => {
        const orderType = select_order.current.value;
        console.log(orderType);

        if ( orderType == "최신순") {
            getData();
        } else if (orderType == "제목순") {
            sortEvent('title');
        } else {
            console.log("별점");
            sortEvent('avg');
        }
    }

    // 클릭한 이벤트 주소 받아오기
    const getAddress = async (id) => {
        let response = await axios.get(process.env.REACT_APP_EVENT_URL + "/address", {
            params: {id : id}
        })
        setAddress(response.data.address);
        setClickData(response.data);
    }

    // 좋아요 버튼 설정
    const LikeIt = (id) => {
        if ( localStorage.getItem("access_token") != undefined ) {
            const datas = JSON.parse(JSON.stringify(eventData));
            axios({
                url: process.env.REACT_APP_USER_URL + '/auth',
                headers: {
                    'Authorization': localStorage.getItem("access_token")
                }
            }).then( (result) => {
                // 좋아요 안 된 상태
                if (!datas[`id_${id}`].like) {
                    console.log('like');
                    axios.post(process.env.REACT_APP_EVENT_URL + "/like", {user_id : result.data.id, event_id : id});
                    datas[`id_${id}`].like = true;
                } else {
                    console.log("dislike");
                    axios.post(process.env.REACT_APP_EVENT_URL + "/dislike", {user_id : result.data.id, event_id : id});
                    datas[`id_${id}`].like = false;
                }
                setEventData(datas);
            });
        } else {
            alert("로그인 후 이용가능");
        }
    }

    useEffect(() => {
        getData();
    }, [filter, address, props.id])

    return (
        <div className="totalSection">
            <div className='mapSection'>
                <Map id={props.id} filter={filter} address={address} clickData={clickData} pass={pass}/>
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
                                <option value='강동구' className='option'>강동구</option>
                                <option value='강북구' className='option'>강북구</option>
                                <option value='강서구' className='option'>강서구</option>
                                <option value='관악구' className='option'>관악구</option>
                                <option value='광진구' className='option'>광진구</option>
                                <option value='구로구' className='option'>구로구</option>
                                <option value='금천구' className='option'>금천구</option>
                                <option value='노원구' className='option'>노원구</option>
                                <option value='도봉구' className='option'>도봉구</option>
                                <option value='동대문구' className='option'>동대문구</option>
                                <option value='동작구' className='option'>동작구</option>
                                <option value='마포구' className='option'>마포구</option>
                                <option value='서대문구' className='option'>서대문구</option>
                                <option value='서초구' className='option'>서초구</option>
                                <option value='성동구' className='option'>성동구</option>
                                <option value='성북구' className='option'>성북구</option>
                                <option value='송파구' className='option'>송파구</option>
                                <option value='용산구' className='option'>용산구</option>
                                <option value='은평구' className='option'>은평구</option>
                                <option value='종로구' className='option'>종로구</option>
                                <option value='중구' className='option'>중구</option>
                                <option value='중랑구' className='option'>중랑구</option>
                                <option value='영등포구' className='option'>영등포구</option>
                                <option value='양천구' className='option'>양천구</option>
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

                            <select label="order" ref={select_order} name="order" className="SelectType" onChange={orderBy}>
                                <option value="" disabled selected>Order</option>
                                <option value='최신순' className='option'>최신순</option>
                                <option value='제목순' className='option'>제목순</option>
                                <option value='별점순' className='option'>별점순</option>
                            </select>
                        
                            <div style={{width:'40%',margin:'0 10px'}} className='datepicker'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker value={calendar} onChange={handleChange_date} ref={select_date} componentsProps={{actionBar : { actions: ['clear'] }, }} renderInput={(params) => <TextField  {...params} />} 
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </div>
                
                    {Object.entries(eventData).length == 0 ? <p>조건에 맞는 결과가 없습니다</p> : <div className='listSection'>                        
                        {Object.entries(eventData).map((value) => {

                            let data = value[1];
                            let time = value[1].time.replaceAll('\\n','  ');
                            let num = Number(data.avg);

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
                                                <div style={{width:'100%',marginTop:'15px'}}>
                                                    <p className='list_place'><MdPlace style={{color:'red', marginRight:'5px'}}/>{data.place}</p>
                                                    <div className='list_period_layout'>
                                                        <div><FcCalendar style={{marginRight: '5px'}}/></div>
                                                        <div className='list_period_start'>{data.start_date} </div>
                                                        <div> ~ </div>
                                                        <div className='list_period_end'> {data.end_date}</div>
                                                    </div>
                                                    <div className='list_time_layout'>
                                                        <div><FcClock style={{marginRight: '5px'}}/></div>
                                                        <div className='list_period_time'>{time}</div>
                                                    </div>
                                                    <div className='list_review_section'>
                                                        {data.avg == null ? <div>0.00</div> : <div className='list_review'><div style={{color:'yellow'}}><BsStarFill /></div><div style={{marginBottom:'2px', marginLeft:'5px'}}>{num.toFixed(1)}</div></div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='Btns'>
                                                
                                                <button className='goView' type="button" onClick={() => { navigate('/event/'+ data.id); }}>상세보기</button>
                                                <button className='likes' onClick={() => {LikeIt(data.id)}} ref={heart}>
                                                    {data.like ? <FaHeart /> : <FaHeart style={{color: "lightgray"}}/>}
                                                </button>
                                                <button className='goMap' type="button" onClick={() => { getAddress(data.id)}}><img src={GPS} style={{width:'30px',height:'30px'}}/></button>
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
                    </div>}
                </div>
            </div>
    )
}

export default Event;