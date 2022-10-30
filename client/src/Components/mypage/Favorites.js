import { Link } from 'react-router-dom';
import "./Favorites.scss";


import h_icon1 from './img/g_tit_01.png';
import h_icon2 from './img/g_tit_02.png';
import h_icon3 from './img/g_tit_03.png';


const Favorites = (props) => {
    // console.log(props);

    const event = props.event;
    return (
        <div className='myPageFavoritesBox'>
            {
                event.map((value) => {
                    return (
                        <div className='listGallery2' key={value.id}>
                            {/* <p>{value.title}</p> */}
                            <img className='g_img2' src={'/img/' + value.filename} alt='' />
                            <p className='g_tit_h1'>{value.title}</p>

                            <div className='g_hover2'>
                                <div className='sangseBox'>
                                    <Link to={"/event/" + value.id}><span className='sangseBtn'>상세 보기</span></Link>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Favorites;