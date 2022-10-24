import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import axios from 'axios';
import './Gallery.scss';


import h_icon1 from './img/g_tit_01.png';
import h_icon2 from './img/g_tit_02.png';
import h_icon3 from './img/g_tit_03.png';

const MAIN_PAGE = "http://localhost:8000/";

const Gallery = ({timeline, ease}) => {

    const [type, setType] = useState("전체");
    const [data, setData] = useState([]);

    let text1 = useRef(null);

    // 전체 카테고리에 관련된 내용이 활성화 되었을 시 전체 카테고리 active 주기 위해 정의
    const links = [...document.querySelectorAll('.buttonBox span')];
    let activeIndex = 0;
    let currentIndex = 0;
    let increment = 1;

    links.forEach((link, index) => {
        link.addEventListener("click", e => {
            activeIndex = index;
            let t = setInterval(() => {
                if (activeIndex > currentIndex) increment = 1;
                else if (activeIndex < currentIndex) increment = -1;
                currentIndex += increment;

                links[currentIndex].classList.add("active");
                if (currentIndex != -1) links[currentIndex - increment].classList.remove("active");

                if (currentIndex == activeIndex) {
                    e.target.classList.add("active");
                    increment = 0;
                    clearInterval(t);
                }
            }, 50);
        });
    });


    // 카테고리 불러오기 위해 정의
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


    // 텍스트 애니메이션 효과
    useEffect(() => {
        timeline.from(text1, {
            opacity: 0,
            y: 100,
        })
    })


    return (
        <section>
            <div className='galleryTitle' ref={el => text1 = el} style={{ opacity: 1}}>
                <h1 className='g_tit'>공연 일정</h1>
            </div>

            <div className='galleryBox'>
                <div className='buttonBox'>
                    <span className='active'>
                        <Button name="전체" onClick={setCategory} />
                    </span>

                    <span className=''>
                        <Button name="축제" onClick={setCategory} />
                    </span>

                    <span className=''>
                        <Button name="공연" onClick={setCategory} />
                    </span>

                    <span className=''>
                        <Button name="콘서트" onClick={setCategory} />
                    </span>

                    <span className=''>
                        <Button name="박람회" onClick={setCategory} />
                    </span>

                    <span className=''>
                        <Button name="전시" onClick={setCategory} />
                    </span>
                </div>

                <div className='listBox'>
                    {data.map((data) => {
                        return (
                            <div className='listGallery' key={data.id}>
                                <Link to={"/event/" + data.id}>
                                    <img className='g_img' src={"./img/" + data.filename} alt='' />
                                    <div className='g_hover'>
                                        <p className='g_tit_h1'>{data.title}</p>
                                        <p className='g_tit_h2'><img className='g_tit_img' src={h_icon1} alt='' /> {data.start_date} - {data.end_date}</p>
                                        <p className='g_tit_h3'><img className='g_tit_img' src={h_icon2} alt='' /> {data.type}</p>
                                        <p className='g_tit_h3'><img className='g_tit_img' src={h_icon3} alt='' /> {data.place}</p>
                                        <p className='g_tit_h4'>{data.detail}</p>
                                    </div>
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