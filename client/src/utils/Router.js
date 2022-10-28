import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import Main from '../pages/Main';
import Event from '../pages/Event';
import EventDetail from '../pages/EventDetail';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import FindId from '../pages/FindId';
import Resetpw from '../pages/Resetpw';
import MyPage from '../components/mypage/MyPage';
import Chat from '../pages/Chat/Chat';
import Schedule from '../pages/Schedule/Schedule';
import ScrollToTop from '../components/ScrollToTop';


const Router = () => {

    const [nickname, setNickname] = useState('');
    const [id, setId] = useState('');

    const getAuth =  () => {
        if ( localStorage.getItem("access_token") != undefined ) {
            axios({
                url: 'http://localhost:8000/user/auth',
                headers: {
                    'Authorization': localStorage.getItem("access_token")
                }
            }).then((result) => {
                setId(result.data.id);
                setNickname(result.data.nickname);
            });
        }
    }

    useEffect(() => {
        getAuth();
    }, [])

    return (
        <div>
            <BrowserRouter>
                <Header name={nickname} />
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/event" element={<Event id={id} />} />
                    <Route path="/event/:id" element={<EventDetail user_id={id} />} />
                    <Route path="/user/signup" element={<Signup />} />
                    <Route path="/user/login" element={<Login setNickname={setNickname} setId={setId} />} />
                    <Route path="/user/findid" element={<FindId />} />
                    <Route path='/user/resetpw' element={<Resetpw />} />
                    <Route path="/mypage" element={<MyPage id={id}/>} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/schedule" element={<Schedule />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default Router;