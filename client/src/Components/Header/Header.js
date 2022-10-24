
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.scss';

const Header = (props) => {

    const navigate = useNavigate();
    const [isMenu, setMenu] = useState(false);

    const hambugerBtn = () => {
        setMenu(isMenu => !isMenu);
    }
    
    const LogOut = () => {
        // props.setNickname();
        window.localStorage.clear();
        window.location.replace('/');
    }
    
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
                            <ul className="navbar_2 navbar_pc">
                                <li>{props.name}</li>
                                <li style={{cursor:'pointer'}} onClick={LogOut}> 로그아웃 </li>
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