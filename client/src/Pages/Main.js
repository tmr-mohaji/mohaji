import Banner from '../components/Banner/Banner';
import Gallery from '../components/MainGallery/Gallery'

import {gsap, Power3} from 'gsap';

const Main = () => {
    let tl = new gsap.timeline();
    let ease = Power3.easeOut;

    return (
        <div>
            <Banner timeline={tl} ease={ease} />
            <Gallery />
        </div>
    )
}

export default Main;