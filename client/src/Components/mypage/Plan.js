import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Plan.scss';
import Calendar from './Calendar';

const Plan = (props) => {

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

    const deleteSchedule = async (id) => {
        if ( props.id != "") {
            let result = await axios.get(process.env.REACT_APP_SCHEDULE_URL + "/deleteEvent", {
                params : {id : id}
            });
            getSchedule();
        }
    }

    useEffect(() => {
        init();
        getSchedule();
    }, [props.id]);

    return (
        <>
            <h1 className='planText'>나의 일정을 확인해보세요!😊</h1>
            <div style={{width:'100%',height:'100%', marginTop:'50px'}}>
                <Calendar schedule={schedule} deleteSchedule={deleteSchedule} id={props.id}/>
                
            </div>
        </>
    )
}

export default Plan;