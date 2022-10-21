import { useEffect, useState } from 'react';
import Button from '../Button';
import axios from 'axios';
import './Gallery.scss';

const MAIN_PAGE = "http://localhost:8000/";

const Gallery = () => {

    const [type, setType] = useState("전체");
    const [data, setData] = useState([]);

    const setCategory = (name) => {
        setType(name);
    }

    const getData = async () => {
        const response = await axios.get(MAIN_PAGE, {
            params: { type: type }
        })
        setData(response.data);

    }

    useEffect(() => {
        getData();
    }, [type])

    return (
        <section>
            <div className='galleryBox'>
                <div className='buttonBox'>
                    <Button name="전체" onClick={setCategory} />
                    <Button name="축제" onClick={setCategory} />
                    <Button name="공연" onClick={setCategory} />
                    <Button name="콘서트" onClick={setCategory} />
                    <Button name="박람회" onClick={setCategory} />
                    <Button name="전시" onClick={setCategory} />
                </div>

                <div className='listBox'>
                    {data.map((data) => {
                        return (
                            <div className='listGallery' key={data.id}>
                                <p>{data.title}</p>
                                <img src={"./img/" + data.filename} style={{ width: "200px" }} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Gallery;