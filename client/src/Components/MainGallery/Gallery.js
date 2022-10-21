import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import axios from 'axios';
import './Gallery.scss';

import h_icon1 from './img/g_tit_01.png';
import h_icon2 from './img/g_tit_02.png';
import h_icon3 from './img/g_tit_03.png';

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
                                <img className='g_img' src={"./img/" + data.filename} />

                                <div className='g_hover'>
                                    <p className='g_tit_h1'>{data.title}</p>
                                    <p className='g_tit_h2'><img className='g_tit_img' src={h_icon1} alit='' /> {data.start_date} - {data.end_date}</p>
                                    <p className='g_tit_h3'><img className='g_tit_img' src={h_icon2} alit='' /> {data.type}</p>
                                    <p className='g_tit_h3'><img className='g_tit_img' src={h_icon3} alit='' /> {data.place}</p>
                                    <p className='g_tit_h4'>{data.detail}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Gallery;