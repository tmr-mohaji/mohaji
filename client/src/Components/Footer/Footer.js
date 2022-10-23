import { Link } from 'react-router-dom';

import './Footer.scss';

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="container">
                    <div className="wrap">
                        <ul className="f17 menu">
                            <li>
                                <Link className='f_line' to='/'> 홈 </Link>
                            </li>
                            <li>
                                <Link className='f_line' to='/event'> 서브 메뉴1 </Link>
                            </li>
                            <li>
                                <Link className='f_line' to='/event'> 서브 메뉴2 </Link>
                            </li>
                            <li>
                                <Link className='f_line' to='/event'> 서브 메뉴3 </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="privacy"></div>

                    <div className="wrap">
                        <p className="copy">
                            조장 : 방장원  <span className='c_line'>|</span>  팀원 : 김세령, 윤미진 <br />
                            <span style={{fontSize : '12px'}}>©2022 What should I do tomorrow? All Rights Reserved.</span>
                        </p>

                        <ul className="f_logo">
                                <li>
                                    <h1>내일 뭐하지?</h1>
                                </li>
                            </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;