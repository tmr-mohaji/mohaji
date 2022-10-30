import { useNavigate } from 'react-router-dom';
import './MyPlan.scss';

function MyPlanModal (props) {

    const navigate = useNavigate();

    console.log('모달:' ,props)
    let data = props.modalData;

    const closeModal = () => {
        props.setModal(false);
    }

    const goPlan = () => {
        navigate('/event/' + data.id);
    }
    return(
        <div>
            <div className='myplan_container'>
                <div className='myplan_top_section'></div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center',marginTop:'10%'}}>
                        <div>{data.title}</div>
                        <div style={{marginTop:'10px'}}>{data.date}</div>
                    </div>
                    <div className='myplan_btn'>
                        <button type='button' onClick={goPlan}>바로가기</button>
                        <button type='button' onClick={closeModal} className='close'>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPlanModal;