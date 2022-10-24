import { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Banner.scss';

// Wave 근처에 있는 사람 일러스트 정의
import banner_img1 from './img/s1_back01.png';
import banner_img2 from './img/s1_back02.png';

// 폭죽 일러스트 정의
import fire_work1 from './img/firework01.png';
import fire_work2 from './img/firework02.png';
import fire_work3 from './img/firework03.png';
import fire_work4 from './img/firework04.png';


/*=================================================================
✅ Main.js -> gsap 라이브러리 설치 및 호출 -> props 값으로 보냄
✅ 순차적으로 애니메이션을 실행하기 위해 timeline 메서드를 사용
=================================================================*/
const Banner = ({timeline, ease}) => {
    let image1 = useRef(null);
    let image2 = useRef(null);
    let image3 = useRef(null);

    let text1 = useRef(null);
    let text2 = useRef(null);
    let text3 = useRef(null);

    let fireWork1 = useRef(null);
    let fireWork2 = useRef(null);
    let fireWork3 = useRef(null);
    let fireWork4 = useRef(null);

    const navigate = useNavigate();

    const goToEvent = () => {
        navigate('/event');
    }

    // 배경 애니메이션 효과
    useEffect(() => {
        timeline.from(image1, 0.6, {
            y: 1000,
            transformOrigin: 'bottom center',
            ease: ease,
        });
        timeline.from(image2, 0.6, {
            y: 750,
            transformOrigin: 'bottom center',
            ease: ease,
        });
        timeline.from(image3, 0.6, {
            y: 550,
            transformOrigin: 'bottom center',
            ease: ease,
        });
    });


    // 텍스트 애니메이션 효과
    useEffect(() => {
        timeline.from(text1, 0.6, {
            opacity: 0,
            y: 100,
            stagger: {
                amount: .4
            }
        });

        timeline.from(text2, 0.6, {
            opacity: 0,
            y: 100,
            stagger: {
                amount: .4
            }
        });

        timeline.from(text3, 0.6, {
            opacity: 0,
            y: 100,
            stagger: {
                amount: .4
            }
        });
    })


    // 폭죽 애니메이션 효과
    useEffect(() => {
        timeline.from(fireWork1, {
            scale: 0,
            repeat: -1,
            repeatDelay: 5,
            duration: .6,
        });

        timeline.from(fireWork2, {
            scale: 0,
            repeat: -1,
            repeatDelay: 5,
            duration: .6,
        });

        timeline.from(fireWork3, {
            scale: 0,
            repeat: -1,
            repeatDelay: 5,
            duration: .6,
        });

        timeline.from(fireWork4, {
            scale: 0,
            repeat: -1,
            repeatDelay: 5,
            duration: .6,
        });
    })

    return(
        <section>
            <div className='bannerBox'>

                <div className="imgwork">
                    <div className="pp p_01">
                        <img src={banner_img1} alt="" />
                    </div>
                    <div className="pp p_02">
                        <img src={banner_img2} alt="" />
                    </div>
                </div>

                <div className="firework">
                    <div className="f_01 ff" ref={el => fireWork1 = el} style={{ transform: 'translate3d(0px, 0px, 0px) scale(0.9184, 0.918403)' }}>
                        <img className='fw_m' src={fire_work1} alt="" />
                    </div>
                    <div className="f_02 ff" ref={el => fireWork2 = el} style={{ transform: 'translate3d(0px, 0px, 0px) scale(0.9184, 0.918403)' }}>
                        <img className='fw_m' src={fire_work2} alt="" />
                    </div>
                    <div className="f_03 ff" ref={el => fireWork3 = el} style={{ transform: 'translate3d(0px, 0px, 0px) scale(0.9184, 0.918403)' }}>
                        <img className='fw_m' src={fire_work3} alt="" />
                    </div>
                    <div className="f_04 ff" ref={el => fireWork4 = el} style={{ transform: 'translate3d(0px, 0px, 0px) scale(0.9184, 0.918403)' }}>
                        <img className='fw_m' src={fire_work4} alt="" />
                    </div>
                </div>

                <div className="bgwork">
                    <div className="b_01 bb" ref={el => image3 = el} style={{ transform: 'translate(0px, 0px)', transformOrigin: '50% 100%' }}></div>
                    <div className="b_02 bb" ref={el => image2 = el} style={{ transform: 'translate(0px, 0px)', transformOrigin: '50% 100%' }}></div>
                    <div className="b_03 bb" ref={el => image1 = el} style={{ transform: 'translate(0px, 0px)', transformOrigin: '50% 100%' }}></div>
                </div>


                <div className="tbx">
                    <div className="im1" ref={el => text1 = el} style={{ opacity: 1, transform: 'translate(0px, 0px)' }}>
                        <h1>내일 <br />뭐하지?</h1>
                    </div>

                    <div className='im2' ref={el => text2 = el} style={{ opacity: 1, transform: 'translate(0px, 0px)' }}>
                        <p>전시회 및 축제 등의 이벤트 일정 제공 사이트</p>
                    </div>


                    <div className='im3' ref={el => text3 = el} style={{ opacity: 1, transform: 'translate(0px, 0px)' }}>
                        <span onClick={goToEvent} className="a_text search_btn">지역 검색</span>
                    </div>
                </div>

            </div>


            <div className='waveBox'>
                <div className="w">
                    <div className="wave"></div>
                </div>
            </div>

        </section>
    );
}

export default Banner;