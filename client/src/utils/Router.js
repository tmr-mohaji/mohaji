import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';

import Main from '../pages/Main';
import Event from '../pages/Event';
import EventDetail from '../pages/EventDetail';
import Signup from '../pages/Signup'
import FindId from '../pages/FindId';

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
                    <Route path="/user/findid" element={<FindId />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;