import { useEffect, useState } from 'react';
import axios from 'axios';

const SEARCH_PAGE = "http://localhost:8000/search";

const Search = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const response = await axios.get(SEARCH_PAGE);
        setData(response.data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            {data.map((data) => {
                return (
                    <div key={data.id}>
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
                        <img src={"./img/" + data.filename} style={{width: "200px"}}/>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}

export default Search;