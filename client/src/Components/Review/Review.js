const Review = (props) => {
    return (
        <div>
            <p>글쓴이 : {props.id}</p>
            <p>별점 : {props.score}</p>
            <p>댓글 : {props.review == null ? "" : props.review}</p>
            <p>작성일 : {props.date}</p>
            <img src={"/img/review_img/" + props.file} style={{width: "200px"}}/>
        </div>
    )
}

export default Review;