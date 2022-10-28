import { useEffect, useState } from 'react';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import './Plan.scss';
import Calendar from './Calendar';

// const SCHEDULE_URL = "http://localhost:8000/schedule/";


const Plan = (props) => {

    const [schedule, setSchedule] = useState([]);

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
        getSchedule();
    }, [props.id]);

    return (
        <div style={{width:'100%',height:'100%'}}>
            {
                schedule.map((value) => {
                    return(
                        <div key={value.id}>
                            <p>{value.title}</p>
                            <p>{value.date}</p>
                            <p onClick={() => {deleteSchedule(value.id)}}>삭제</p>

                        </div>
                    )
                })
            }

            <Calendar schedule={schedule}/>
            
        </div>
    )
}

export default Plan;