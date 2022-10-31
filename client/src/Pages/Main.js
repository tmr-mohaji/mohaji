import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import Banner from '../components/Banner/Banner';
import Gallery from '../components/MainGallery/Gallery'
import Mypage from '../components/MainMyPage/Mypage';

import {gsap, Power3} from 'gsap';


const Main = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const navigate = useNavigate();

    let tl = new gsap.timeline();
    let ease = Power3.easeOut;

    const init = () => {
        if (searchParams.get("token")) {
            window.localStorage.setItem("access_token", searchParams.get("token") );
            navigate("/");
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <div>
            <Banner timeline={tl} ease={ease} />
            <Gallery  />
            <Mypage />
        </div>
    )
}

export default Main;