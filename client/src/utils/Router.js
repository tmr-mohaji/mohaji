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
import MyPage from '../pages/MyPage';


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
    })

    return (
        <div>
            <BrowserRouter>
                <Header name={nickname} />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/event" element={<Event id={id} />} />
                    <Route path="/event/:id" element={<EventDetail />} />
                    <Route path="/user/signup" element={<Signup />} />
                    <Route path="/user/login" element={<Login setNickname={setNickname} setId={setId} />} />
                    <Route path="/user/findid" element={<FindId />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default Router;