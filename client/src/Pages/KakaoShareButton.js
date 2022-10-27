import React, { useEffect } from 'react';

const KakaoShareButton = (props) => {

    useEffect(() => {
        createKakaoButton()
    },[])


    const createKakaoButton = () => {
        
        const title = props.title;
        const detail = props.detail;
        
        if (window.Kakao) {
            const kakao = window.Kakao

            if (!kakao.isInitialized()) {
                kakao.init(process.env.REACT_APP_KAKAO_KEY)
            }

            kakao.Link.createDefaultButton({
                container: '#kakao-link-btn',
                objectType: 'feed',
                content: {
                    title: '내일뭐하지?',
                    description: '내일뭐하지 이벤트 공유',
                    imageUrl : 'https://ifh.cc/g/ClpKtN.jpg',
                    link: {
                        mobileWebUrl : 'http://localhost:8000/event/'+ props.id,
                        webUrl: 'http://localhost:8000/event/'+ props.id,
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
                            mobileWebUrl : 'http://localhost:8000/event/'+ props.id,
                            webUrl: 'http://localhost:8000/event/'+ props.id,
                        },
                    },
                ],

                installTalk: true,
            })
        }
    }


    return (
        <div className='kakao-share-button'>
            <button id='kakao-link-btn' style={{border:'0', background:'transparent',width:'40px',height:'40px',marginRight:'10px',cursor:'pointer'}}>
                <img src='/img/kakaoshare.png' alt='kakao-share-icon' />
            </button>
        </div>
    )
}

export default KakaoShareButton;