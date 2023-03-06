import React from 'react'
//import axios from 'axios';
import { AppContext } from '../App'

export const AddNew = () => {
    const {onInputSubmit} = React.useContext(AppContext);
    const {inputToDo, setInputToDo} = React.useContext(AppContext);

    return (
        <div className='todo_input wrapper'>
            <header className='header'>TodoInput</header>
            <section>
                <div className='input_block'>
                    <div>
                        <img src="/todo-list/img/addNew.png" alt="addNew" width={30} height={30} />
                    </div>
                    <input type="text" placeholder='New Todo' 
                    value={inputToDo} onChange={(e) => setInputToDo(e.target.value)}/>
                </div>
                <button onClick={onInputSubmit}>Add new task</button>
            </section>
        </div>
    )
}
