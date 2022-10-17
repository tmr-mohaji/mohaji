import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from '../Pages/Main';

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;