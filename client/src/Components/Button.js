import { useRef } from 'react';
import axios from 'axios';

const SEARCH_PAGE = "http://localhost:8000/search";

const Button = () => {

    const city = useRef();
    
    const sendCity = async () => {
        const name = city.current.innerText;
        await axios.get(SEARCH_PAGE, {
            params: {city: name}
        });
        window.location = "/search?city=" + name;
    }

    return(
        <button onClick={sendCity} ref={city}>강남구</button>
    )
}

export default Button;