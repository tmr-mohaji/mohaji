import { useEffect, useState } from "react";
import axios from 'axios';

const USER_URL = "http://localhost:8000/user/";

const MyPage = () => {

    const [id, setId] = useState("");
    const [data, setData] = useState([]);

    const checkToken = async () => {
        await axios({
            url: USER_URL + 'auth',
            headers: {
                'Authorization': localStorage.getItem("access_token")
            }
        }).then((result) => {
            setId(result.data.id);
            getData();
        });
    }

    const getData = async () => {
        let result = await axios.get(USER_URL + "info", {
            params: {id : id}
        })
        setData(result.data);
    }

    useEffect(() => {
        checkToken();
    })

    return (
        <div style={{paddingTop: "100px"}}>
            {data.id} <br />
            {data.nickname} <br />
            {data.email}
        </div>
    )
}

export default MyPage;