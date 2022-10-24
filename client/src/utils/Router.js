import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import Main from '../pages/Main';
import Event from '../pages/Event';
import EventDetail from '../pages/EventDetail';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import FindId from '../pages/FindId';
import MyPage from '../pages/MyPage';


const Router = () => {
    return (
        <div>
            <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/event" element={<Event />} />
                    <Route path="/event/:id" element={<EventDetail />} />
                    <Route path="/user/signup" element={<Signup />} />
                    <Route path="/user/login" element={<Login />} />
                    <Route path="/user/findid" element={<FindId />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default Router;