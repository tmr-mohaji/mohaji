import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
                                <Link to={"/event/" + data.id}>
                                    <img className='g_img' src={"./img/" + data.filename} />
                                    <p className='g_tit'>{data.title}</p>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Gallery;