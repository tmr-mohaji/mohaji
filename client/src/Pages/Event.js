import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Event.scss';
import Map from '../components/Event/Map';
import { MdPlace } from 'react-icons/md';
import { FcCalendar,FcClock } from 'react-icons/fc'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import {AdapterDayjs ,LocalizationProvider,DatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EVENT_PAGE = "http://localhost:8000/event";

const Event = () => {

    // select box 설정
    const [city, setCity] = useState('');
    const [type, setType] = useState('');
    //달력 정보
    const [calendar, setCalendar] = useState(null);

    // const handleChange = (event) => {
    //     setCity(event.target.value);
    //     setType(event.target.value);
    //     //setCalendar(event.target.value);
    //     // 필터링 정보가 바뀌었을 때
    //     setFilter({...filter, [event.target.name]: event.target.value,});
    //     console.log(filter);
    // };

    const handleChange_city = (event) => {
        setCity(event.target.value);
        setFilter({...filter, [event.target.name]: event.target.value,});
        console.log(filter);
    };

    const handleChange_type = (event) => {
        setType(event.target.value);
        setFilter({...filter, [event.target.name]: event.target.value,});
        console.log(filter);
    };
    
    const handleChange_date = (event) => {
        console.log(event.$d);
        let pickDate = String(event.$d).split(" ");
        console.log(pickDate)
        //여기 날짜 변환하는 것 해야함~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(month 변환해야함!)
                
        // console.log(pickDate)
        // setCalendar(pickDate);
        // setFilter({...filter, date : pickDate });
        // console.log(filter);
    };
    

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
    const select_date = useRef();

    // 도시 정보로 데이터 가져오기
    const getData = async () => {
        const response = await axios.get(EVENT_PAGE, {
            params: {city: filter.city, type: filter.type, date: filter.date}
        })
        setData(response.data);

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

    }, [filter, address])



    return (
        <div style={{ width: "70%", margin: "100px auto 0 auto", display: "flex", gap: "50px", justifyContent: 'center'}}>
            <div style={{width:'100%',position:'relative'}}>
                <Map filter={filter} address={address} />
            </div>
            <div style={{width:'100%', position:'relative'}}>
                <div style={{display:'flex',width:'90%'}}>
                <FormControl style={{width:'30%',margin:'10px'}}>
                    <InputLabel>city</InputLabel>
                    <Select
                        value={city}
                        label="city"
                        onChange={handleChange_city}
                        ref={select_city}
                        name='city'
                    >
                        <MenuItem value='전체'>전체</MenuItem>
                        <MenuItem value='강남구'>강남구</MenuItem>
                        <MenuItem value='종로구'>종로구</MenuItem>
                        <MenuItem value='영등포구'>영등포구</MenuItem>
                    </Select>
                </FormControl>
                    
                <FormControl style={{width:'30%',margin:'10px'}}>
                    <InputLabel>type</InputLabel>
                    <Select
                        value={type}
                        label="type"
                        onChange={handleChange_type}
                        ref={select_type}
                        name='type'
                    >
                        <MenuItem value='전체'>전체</MenuItem>
                        <MenuItem value='축제'>축제</MenuItem>
                        <MenuItem value='공연'>공연</MenuItem>
                        <MenuItem value='콘서트'>콘서트</MenuItem>
                        <MenuItem value='박람회'>박람회</MenuItem>
                        <MenuItem value='전시'>전시</MenuItem>
                    </Select>
                </FormControl>
                <div style={{width:'40%', margin:'10px'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Basic example"
                        value={calendar}
                        onChange={handleChange_date}
                        ref={select_date}
                        name="date"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                </div>
                </div>


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