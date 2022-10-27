const Review = (props) => {
    return (
        <div>
            <p>{props.id}</p>
            <p>{props.score}</p>
            <p>{props.review == null ? "" : props.review}</p>
            <p>{props.date}</p>
            {props.file != null && <img src={"/img/review_img/" + props.file} style={{width: "200px"}}/>}
        </div>
    )
}

export default Review;