import { useEffect, createRef } from 'react';
import axios from 'axios';

import ListGallery from './List_Gallery';

// const LIST_PAGE = 'http://localhost:8000/';


function ListSearch() {

    const {select_region, select_type} = createRef();
    const [ itemList , setItemList ] = useState([])

    const getList = async () => {
        axios
        .get(LIST_PAGE)
        .then((data) => {
            console.log(data);
        })
        setItemList(data);

    }

    useEffect(() => {
        getList();
    })

    return(
        <>
            <div>
                {/* 지역 */}
                <select ref={select_region}>
                    <option value="전체">전체</option>
                    <option value="강남구">강남구</option>
                    <option value="종로구">종로구</option>
                    <option value="영등포구">영등포구</option>
                </select>

                {/* 종류 */}
                <select ref={select_type}>
                    <option value="전체">전체</option>
                    <option value="공연">공연</option>
                    <option value="박람회">박람회</option>
                    <option value="전시">전시</option>
                    <option value="축제">축제</option>
                    <option value="콘서트">콘서트</option>
                </select>
                
                {/* 기간 */}
                <input type='data' ref={select_period}/>

            </div>
            
            <div className='select_view_type'>
                <input type='radio' value='list_type'>리스트</input>
                <input type='radio' value='gallery_type'>갤러리</input>
            </div>
            
            {/* { ( 위에 리스트, 갤러리에서 선택된 값 ) ? <div>리스트형태 컴포넌트</div> : <div><List_Gallery /></div>} */}
            

    </>
    )
}

export default ListSearch;