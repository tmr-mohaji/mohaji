import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Plan.scss';
import Calendar from './Calendar';

const Plan = (props) => {

    // 1번째
    // props.id = user id

    const [schedule, setSchedule] = useState([]);
    const navigate = useNavigate();
    
    const init = () => {
        if ( localStorage.getItem("access_token") == undefined ) {
            navigate("/user/login");
        }
    }

    const getSchedule = async () => {
        if (props.id != "") {
            let result = await axios.get(process.env.REACT_APP_SCHEDULE_URL + "/getEvent", {
                params : {user_id : props.id}
            });
            setSchedule(result.data);
        }
    }

    useEffect(() => {
        init();
        getSchedule();
    }, [props.id, props.planId]);

    return (
        <>
            <h1 className='planText'>나의 일정을 확인해보세요!😊</h1>
            <div style={{width:'100%',height:'100%', marginTop:'50px'}}>
                <Calendar schedule={schedule} setSchedule={setSchedule} getSchedule={getSchedule} id={props.id}/> 
            </div>
        </>
    )
}

export default Plan;