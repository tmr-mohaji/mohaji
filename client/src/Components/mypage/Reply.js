// import axios from 'axios';
import { useState } from 'react';

import "./Reply.scss";

const Reply = (props) => {

	const $reply = props.reply;

	return (
		<section>
			{console.log(props.reply)}

			<div className='replyBox'>
				{$reply.map((data) => {
					return (
						<div className='r_Box' key={data.id}>
							<div className="MainFeedListItem">
								<div className='feed_box1'>
									<p><b style={{ color: 'red' }}>★</b> {data.score}</p>
									<p className='feed_id'>{data.user_id}</p>
									<p className='feed_date'>{data.createdAt.slice(0, 10)}</p>
								</div>

								<div className='feed_box2'>
									<p className='feed_content'>{data.content}</p>
									<p className='feed_img'>{data.filename != false && <img src={"img/review_img/" + data.filename} style={{ width: "120px" }} />}</p>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default Reply;