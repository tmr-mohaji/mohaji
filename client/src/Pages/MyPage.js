import { useEffect } from "react";
import axios from 'axios';

const MyPage = () => {

    const checkToken = () => {
        axios({
            url: 'http://localhost:8000/user/auth',
            headers: {
                'Authorization': localStorage.getItem("access_token")
            }
        }).then((result) => {
            console.log( result.data );
        });
    }

    const getData = () => {

    }

    useEffect(() => {
        checkToken();
    }, [])

    return (
        <div>

        </div>
    )
}

export default MyPage;