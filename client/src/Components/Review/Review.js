import './Review.scss';


const Review = (props) => {
    return (
        <div className='review_people'>            
            <div className='people_one'>
                <p className='po_score'><b style={{ color: 'red' }}>★</b> {props.score}</p>
                <p className='po_txt'>{props.id}</p>
                <p className='po_date'>{props.date.slice(0, 10)}</p>
            </div>

            <div className='people_two'>
                <p>{props.review == null ? "" : props.review}</p>
                {props.file != false && <img src={"/img/review_img/" + props.file} style={{ width: "120px" }} />}
            </div>
            {props.id == props.login_id && <div><button className='reset_btn_1' onClick={props.editReview}>수정</button><button className='delete_btn_2' onClick={props.deleteReview}>삭제</button></div>}


            <hr className='r_hr' style={{ border: "0.5px solid #dadada", width: "100%" }} />
        </div>
    )
}

export default Review;