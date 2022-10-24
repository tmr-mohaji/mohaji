import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Header.scss';

const Header = (props) => {
    const [isMenu, setMenu] = useState(false);
    const [nickname, setNickname] = useState('');

    const hambugerBtn = () => {
        setMenu(isMenu => !isMenu);
    }

    // const getAuth =  () => {
    //     if ( localStorage.getItem("access_token") == undefined ) {
    //         // 로그인, 회원가입 버튼 보여주기
    //         console.log( 'login fail' );
    //     } else {
    //         // 로그인, 회원가입 버튼 대신 마이페이지 버튼 보여주기
    //         console.log( 'login success' );
    //         axios({
    //             url: 'http://localhost:8000/user/auth',
    //             headers: {
    //                 'Authorization': localStorage.getItem("access_token")
    //             }
    //         }).then((result) => {
    //             setNickname(result.data.nickname);
    //         });
    //     }
    // }

    useEffect(() => {

    }, [props.name])

    return (
        <header>
            <div className='headerArea'>
                <div className='head_wrap'>
                    <h1 className='logo'>
                        <Link to='/'>로고</Link>
                    </h1>

                    <ul className="navbar_1 navbar_pc">
                        <li>
                            <Link className='bt_line' to='/event'> 서브 메뉴1 </Link>
                        </li>

                        <li>
                            <Link className='bt_line' to='/event'> 서브 메뉴2 </Link>
                        </li>

                        <li>
                            <Link className='bt_line' to='/event'> 서브 메뉴3 </Link>
                        </li>
                    </ul>

                    <div className='nav'>
                        { props.name == "" ? (
                            <ul className="navbar_2 navbar_pc">
                            <li>
                                <Link to='/user/login'> 로그인 </Link>
                            </li>

                            <li>
                                <Link to='/user/signup'> 회원가입 </Link>
                            </li>
                            </ul>
                        ) : (
                            <ul>
                            <li>{props.name}</li>

                            </ul>
                        ) }

                        <div className='nav_icon' onClick={hambugerBtn}>
                            <div className='nav_hambuger'></div>
                        </div>

                        <div className={isMenu ? 'mob_box' : 'hide_box'}>
                            <ul className="navbar_3 navbar_mobile">
                                <li className='mob_li'>
                                    <Link className='arrow' to='/'> 서브 메뉴1 </Link>
                                </li>

                                <li className='mob_li'>
                                    <Link className='arrow' to='/'> 서브 메뉴2 </Link>
                                </li>

                                <li className='mob_li'>
                                    <Link className='arrow' to='/'> 서브 메뉴3 </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;