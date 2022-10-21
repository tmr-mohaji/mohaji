
function ListGallery (props) {

    return(
        <>

        {

            data.map(function(data,i) {
                return(

                    <div>
                        <div className="이벤트 전체 섹션">
                            <div className="이미지 구조 섹션">
                                <div className='공연 종류'></div>
                                <img></img>
                            </div>

                            <div className='이벤트 상세 섹션'>
                                <div className='이벤트 지역/이름 섹션'>
                                    <span>이벤트 지역</span>
                                    <span>이벤트 이름</span>
                                </div>
                                <div className='이벤트 기간'>
                                    <div>시작일</div>
                                    <div> ~ </div>
                                    <div>마감일</div>
                                </div>
                                <div>이벤트 진행여부(모집중/예정/마감)</div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        </>
    )
}

export default ListGallery;