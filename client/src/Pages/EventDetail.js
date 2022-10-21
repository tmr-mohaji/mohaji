import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DETAIL_PAGE = "http://localhost:8000/event/";

const EventDetail = () => {

    const { id } = useParams();
    const [data, setData] = useState([]);

    const getData = async () => {
        const response = await axios.get(DETAIL_PAGE + id, {
            params: {id : id}
        });
        setData(response.data);
    }

    useEffect(() => {
        getData();
    }, [])

    return(
        <div style={{paddingTop: "100px"}}>
            <p>{data.title}</p>
            <p>{data.detail}</p>
            <p>{data.url}</p>
            <p>{data.type}</p>
            <p>{data.place}</p>
            <p>{data.address}</p>
            <p>{data.start_date}</p>
            <p>{data.end_date}</p>
            <p>{data.time}</p>
            <p>{data.people}</p>
            <p>{data.price}</p>
            <p>{data.filename}</p>
            <img src={"/img/" + data.filename} style={{width: "200px"}}/>
        </div>
    )
}

export default EventDetail;