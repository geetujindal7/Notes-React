import React, { useState, useEffect } from 'react';
import icon from './constants'
import './Notes.css'

const getLocalData = () => {
  let lock = localStorage.getItem('lock');
  let mypass = localStorage.getItem('mypass');
  let sete = localStorage.getItem('sete');
  let passArray = localStorage.getItem('passArray');
  let pass = localStorage.getItem('pass');



  if(lock){
      return JSON.parse(localStorage.getItem('lock'))
  }
  if(passArray){
    return JSON.parse(localStorage.getItem('passArray'))
}
if(mypass){
  return JSON.parse(localStorage.getItem('mypass'))
}
if(sete){
  return JSON.parse(localStorage.getItem('sete'))
}
if(pass){
  return JSON.parse(localStorage.getItem('pass'))
}
}

 
function Common({ i, e, handleDelete, handleEdit }) {
  const [lock, setLock] = useState(getLocalData())
  const [sete, setsete] = useState('')
  const [mypass, setMypass] = useState('')

  const [pass, setPass] = useState(false)
  const [passArray, setPassArray] = useState(getLocalData());



  const handlePasswordChange = (e) => {
    e.preventDefault();
    setsete(e.target.value)
  }

  const handlePassword = (e) => {
    e.preventDefault();
    setMypass(e.target.value)
  }

  const handlePasswordSubmit = (i) => {
    setPassArray({ [i]: sete })
    setPass("")
  }

  const handleUnlock = (i) => {
    if (passArray[i] === mypass) {
      setPass(false)
      setLock(false)
    }
    setMypass("")
    console.log(pass)
  }


 useEffect(() => {
     console.log(pass)
     localStorage.setItem('lock', JSON.stringify(lock))
     localStorage.setItem('pass', JSON.stringify(pass))
     localStorage.setItem('mypass', JSON.stringify(mypass))
     localStorage.setItem('sete', JSON.stringify(sete))
     localStorage.setItem('passArray', JSON.stringify(passArray))


 }, [pass,lock, mypass, sete, passArray])

  return (lock || pass ? (
    <div className='card' key={i}>
      {passArray[i] ? (<><div className='insidetext'>
        <div>
          Your Note is Locked
        </div>
        <br></br>
        <input type="password" onChange={(e) => handlePassword(e)} ></input>
      </div>

        <span className='container'>
          <img src={icon.delete} alt="delete" className='delete' onClick={() => handleDelete(e)} ></img>
          <img src={icon.edit} alt="edit" className='edit' onClick={() => handleEdit(e, i)}></img>
          <img src={icon.unlock} alt="edit" className='unlock' onClick={() => handleUnlock(i)}></img>

        </span>  </>) : (<><div className='insidetext'>
          <div>
            Set your password
          </div>
          <input type="password" onChange={(e) => handlePasswordChange(e)} value={sete}></input>
          <br></br>
          <button onClick={() => handlePasswordSubmit(i)}>
            Submit
          </button>

        </div>

          <span className='container'>
            <img src={icon.delete} alt="delete" className='delete' onClick={() => handleDelete(e)} ></img>
            <img src={icon.edit}  alt="edit" className='edit' onClick={() => handleEdit(e, i)}></img>
          </span>  </>)}</div>

  ) : (<div className='card' key={i}>
    <div className='insidetext'>
      {e}
    </div>
    <span className='container'>
      <img src={icon.delete} alt="delete" className='delete' onClick={() => handleDelete(e)}></img>
      <img src={icon.edit} alt="edit" className='edit' onClick={() => handleEdit(e, i)}></img>
      <img src={icon.lock} alt="edit" className='lock' onClick={() => setLock(!lock)}></img>
    </span>
  </div>))

}

export default Common
