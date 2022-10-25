import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetail.scss';
import axios from 'axios';

const DETAIL_PAGE = "http://localhost:8000/event/";

const EventDetail = () => {

    const { id } = useParams();
    const [data, setData] = useState([]);

    const getData = async () => {
        const response = await axios.get(DETAIL_PAGE + id, {
            params: { id: id }
        });
        setData(response.data);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <section>
            <div className="sub_visual">
                <div className="bg_w">
                    <div className="bg"></div>
                </div>

                <h2 className="sub-t">
                    <strong className="ani">공연일정</strong>
                </h2>
            </div>

            <div className='detailBox'>
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
                <img src={"/img/" + data.filename} style={{ width: "200px" }} alt='' />
            </div>
        </section>
    )
}

export default EventDetail;