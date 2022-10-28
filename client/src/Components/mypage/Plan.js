import { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div>
            {
                schedule.map((value) => {
                    return(
                        <div key={value.id}>
                            <p>{value.title}</p>
                            <p>{value.date}</p>
                            <p onClick={() => {deleteSchedule(value.id)}}>x</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Plan;