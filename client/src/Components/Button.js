import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Button = () => {

    const navigate = useNavigate();
    const city = useRef();
    
    const sendCity = async () => {
        const city_name = city.current.innerText;
        navigate('/search?city=' + city_name, {state: city_name});
    }

    return(
        <button onClick={sendCity} ref={city}>종로구</button>
    )
}

export default Button;