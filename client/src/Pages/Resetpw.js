import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Resetpw() {

  // const [ check, setCheck ] = useState(id);
  const location = useLocation();
  const id = location.state.id;
  const email = location.state.email;

  return(
    <>
      <div style={{marginTop:'200px', minHeight:'100vh'}}>
        <input value={email} readOnly></input><br />
        <input value={id} readOnly></input><br />
        <input type='password' placeholder='비밀번호' name="password" required></input><br />
        <input type='password' placeholder='비밀번호 확인' name="password" required></input><br />
        <button type='button'>변경</button>
      </div>
    </>
  )
}

export default Resetpw;