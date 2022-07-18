import React, { useState, useEffect } from 'react'
import './Notes.css'
import Common from './Common'

const getLocalData = () => {
    let list = localStorage.getItem('list');
    let edit = localStorage.getItem('edit');
    let toggle = localStorage.getItem('toggle');


    if(list){
        return JSON.parse(localStorage.getItem('list'))
    }
    if(edit){
        return JSON.parse(localStorage.getItem('edit'))
    }
    if(toggle){
        return JSON.parse(localStorage.getItem('toggle'))
    }
}

function Notes() {
    const [input, setInput] = useState('')
    const [total, setTotal] = useState(getLocalData())
    const [edit, setEdit] = useState()
    const [toggle, settoggle] = useState(false)



    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value)

    }

    const handleClick = () => {
        if (!input) {
            alert("Please fill the data")
        }
        else if (toggle) {
            let aa = [...total]
            aa[edit] = input
            setTotal([...aa])
            setInput("")
            settoggle(false)
            setEdit()
        }
        else {
            setTotal([...total, input])
            setInput("")
        }
    }

    const handleDelete = (e) => {
        const deletedElements = total.filter((obj) => obj !== e)
        setTotal([...deletedElements])
    }

    const handleEdit = (e, key) => {
        const editing = total.filter((obj) => obj === e)
        console.log(editing, key);
        setInput(editing)
        setEdit(key)
        settoggle(true)
    }

    useEffect(() => {
       localStorage.setItem('list', JSON.stringify(total))
       localStorage.setItem('edit', JSON.stringify(edit))
       localStorage.setItem('toggle', JSON.stringify(toggle))
    
    }, [total,edit,toggle])

    return (
        <>
            <div className='notes'>
                <div className='notes_header'>Notes</div>
                <div className='middle'>
                    <input type="text" className='input_test' onChange={(e) => handleChange(e)} value={input}></input>
                </div>
                <div>
                    <button className='button' onClick={(e) => handleClick(e)}>Submit</button>
                </div>
                {
                    total.map((e, key) => {
                       return  <Common i={key} e ={e} handleDelete ={() => handleDelete(e)} handleEdit ={() => handleEdit(e,key)} />
                        
                    })

                }
            </div>
        </>
    )
}

export default Notes