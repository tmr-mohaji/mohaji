import axios from 'axios';
import { useState } from 'react';

// const SCHEDULE_URL = "http://localhost:8000/schedule/";

const Plan = (props) => {
    const id = props.id;
    const scheduleData = props.schedule;

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

    return (
        <div>
            {
                scheduleData.map((value) => {
                    return(
                        <div>
                            <p>{value.title}</p>
                            <p>{value.date}</p>
                            <p onClick={() => {deleteSchedule(value.id)}}></p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Plan;