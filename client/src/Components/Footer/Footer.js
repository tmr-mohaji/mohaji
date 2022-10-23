import { Link } from 'react-router-dom';

import './Footer.scss';

const Footer = () => {
    return (
        <footer>
            <div class="footer">
                <div class="container">
                    <div class="wrap">
                        <ul class="f17 menu">
                            <li>
                                <Link className='f_line' to='/event'> 홈 </Link>
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

                    <div class="privacy"></div>

                    <div class="wrap">
                        <p class="copy">
                            조장: 방장원  |  팀원: 김세령, 윤미진 <br />
                            <span style={{fontSize : '12px'}}>©2022 What should I do tomorrow? All Rights Reserved.</span>
                        </p>

                        <ul class="f_logo">
                                <li>
                                    <h1>로고</h1>
                                </li>
                            </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;