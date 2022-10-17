import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from '../Pages/Main';
import Search from '../Pages/Search';

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;