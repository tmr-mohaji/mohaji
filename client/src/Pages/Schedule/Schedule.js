import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Schedule = () => {

    const navigate = useNavigate();
    
    const init = () => {
        if ( localStorage.getItem("access_token") != undefined ) {
            axios({
                url: process.env.REACT_APP_USER_URL + '/auth',
                headers: {
                    'Authorization': localStorage.getItem("access_token")
                }
            }).then((result) => {
                console.log(result);
            })
        } else {
            navigate("/user/login");
        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <div style={{paddingTop: "100px"}}>
            <h1>일정</h1>
        </div>
    )
}

export default Schedule;