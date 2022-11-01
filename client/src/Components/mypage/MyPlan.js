import { useNavigate } from 'react-router-dom';
import { FcCalendar } from 'react-icons/fc'
import './MyPlan.scss';
import axios from 'axios';
import { useEffect } from 'react';


function MyPlanModal (props) {
    console.log(props.s_id);

    // 세번째

    const navigate = useNavigate();

    let data = props.modalData;
    let id = props.id;
    console.log(id);

    const closeModal = () => {
        props.setModal(false);
    }

    const goPlan = () => {
        navigate('/event/' + data.id);
    }

    const deleteSchedule = async (id) => {

        if ( props.id != "") {
            let result = await axios.get(process.env.REACT_APP_SCHEDULE_URL + "/deleteEvent", {
                params : {id : props.id, s_id : props.s_id}
            });
            props.getSchedule();
            closeModal();
            window.location.reload();
        }
    }

    return(
        <div>
            <div className='myplan_container'>
                <div className='myplan_top_section'></div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center',marginTop:'10%'}}>
                        <div style={{position:'relative', margin:'0 40px', fontWeight:'700'}}>{data.title}</div>
                        <div style={{marginTop:'10px',fontSize:'13px', display:'flex', alignItems:'center'}}><FcCalendar style={{marginRight: '5px'}}/>{data.date}</div>
                    </div>
                    <div className='myplan_btn'>
                        <button type='button' onClick={goPlan}>바로가기</button>
                        <button type='button' onClick={deleteSchedule}>삭제</button>
                        <button type='button' onClick={closeModal} className='close'>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPlanModal;