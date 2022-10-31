import React, { useEffect } from 'react';

const KakaoShareButton = (props) => {

    useEffect(() => {
        createKakaoButton()
    }, [])

    // useEffect로 createKaKaoButton을 통해서 초기화, 및 createDefaultButton을 해서 proops가 들어오지 않는 것!!
    // 그래서 createKaKaoButton을 먼저한 후, 초기화를 한 다음에 loadBtn 을 실행하는 것!!!!

    const createKakaoButton = () => {
        if (window.Kakao) {
            const kakao = window.Kakao;

            if (!kakao.isInitialized()) {
                kakao.init(process.env.REACT_APP_KAKAO_KEY);
            }
        }
    }
    const loadBtn = (title, detail) => {
        const kakao = window.Kakao;

        kakao.Link.createDefaultButton({
            container: '#kakao-link-btn',
            objectType: 'feed',
            content: {
                title: title,
                description: detail,
                imageUrl : 'https://ifh.cc/g/ClpKtN.jpg',
                link: {
                    mobileWebUrl : process.env.REACT_APP_EVENT_URL + '/' + props.id,
                    webUrl: process.env.REACT_APP_EVENT_URL + '/' + props.id,
                },
            },
            social: {
                likeCount: 77,
                commentCount: 55,
                sharedCount: 333,
            },
            buttons: [
                {
                    title: '같이 참여하기',
                    link: {
                        mobileWebUrl :  process.env.REACT_APP_EVENT_URL + '/' + props.id,
                        webUrl:  process.env.REACT_APP_EVENT_URL + '/' + props.id,
                    },
                },
            ],

            installTalk: true,
        })
    }


    return (
        <div className='kakao-share-button'>
            <button id='kakao-link-btn' style={{border:'0', background:'transparent',width:'40px',height:'40px',marginRight:'10px',cursor:'pointer'}} onClick={() => {loadBtn(props.title, props.detail)}}>
                <img src='/img/kakaoshare.png' alt='kakao-share-icon' />
            </button>
        </div>
    )
}

export default KakaoShareButton;