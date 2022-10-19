import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';

import Main from '../pages/Main';
import Search from '../pages/Search';

const Router = () => {
    return (
        <div>
            <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;