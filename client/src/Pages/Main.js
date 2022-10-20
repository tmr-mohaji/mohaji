import Button from '../components/Button';
import Banner from '../components/Banner/Banner';

import {gsap, Power3} from 'gsap';

const Main = () => {
    let tl = new gsap.timeline();
    let ease = Power3.easeOut;

    return (
        <div>
            <Banner timeline={tl} ease={ease} />
            <Button />
        </div>
    )
}

export default Main;