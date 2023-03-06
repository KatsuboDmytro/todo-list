import React from 'react'
import axios from 'axios';

import { Skeleton } from './Skeleton';
import { AppContext } from '../App'

export const List = ({onDeleteFromBin, onDeleteDoneTask, onDeleteAllTasks}) => {
    const {isLoading} = React.useContext(AppContext);
    const {toDoItem, setToDoItem} = React.useContext(AppContext);
    const {isChecked, setIsChecked} = React.useContext(AppContext);
    const [activeImageId, setActiveImageId] = React.useState(null);
    const {statusId} = React.useContext(AppContext);
    const {filterClick} = React.useContext(AppContext);

    const status = [
        { "button": "All" },
        { "button": "Done" },
        { "button": "Todo" },
    ];

    const editTask = (id, todo) => {
        const newValue = prompt('Enter new value:', todo);
        if (newValue !== null && newValue.trim() !== '') {
            axios.put(`https://63f6813d9daf59d1ad8a1d22.mockapi.io/list/${id}`, {todo: newValue})
            .then(() => {
                setToDoItem(prev => prev.map(todo => {
                if (todo.id === id) {
                    return { ...todo, todo: newValue };
                }
                return todo;
                }));
            })
            .catch(err => console.log(err));
        }
    };
    console.log(activeImageId);
    const handleCheckedChange = (id) => {
        axios.put(`https://63f6813d9daf59d1ad8a1d22.mockapi.io/list/${id}`, {checked: !isChecked})
        .then(() => {
            setToDoItem((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, checked: !item.checked } : item
                )
            );
        })
        .catch(err => console.log(err));
    };

    console.log(toDoItem);

    return (
        <>
            <div className='todo_list wrapper'>
                <header className='header'>TodoList</header>
                <section>
                    {
                        status.map((obj, index) => (
                            <button 
                            className={statusId === index ? 'active' : ''}
                            onClick={() => filterClick(index)}>
                            {obj.button}</button>
                        ))
                    }
                </section>
                {
                    toDoItem >= 0
                    ?
                    <div className='no_one'>
                        <img src="/todo-list/img/noLists.png" alt="noLists" />
                        <div>Ваш записник сумує..</div>
                    </div>
                    :
                    <>
                        <div className="list">
                            {
                                isLoading
                                ?
                                <>
                                        <div className="skeleton"><Skeleton /></div>
                                        <div className="skeleton"><Skeleton /></div>
                                        <div className="skeleton"><Skeleton /></div>
                                </>
                                :
                                <>
                                {
                                    toDoItem.map((item) => (
                                        <div className="todo" key={item.id}>
                                            <div className={item.checked ? 'text done' : 'text'}>{item.todo}</div>
                                            <aside>
                                                <img src={item.checked ? "/todo-list/img/checked.png" : "/todo-list/img/un_checked.png"} 
                                                onClick={() => {
                                                    setIsChecked(!isChecked);
                                                    setActiveImageId(item.id);
                                                    handleCheckedChange(item.id);
                                                  }}
                                                alt="checked" width={25} height={25}/>
                                                <img onClick={() => editTask(item.id, item.todo)} src="/todo-list/img/edit.png" alt="edit" width={25} height={25}/>
                                                <img onClick={() => onDeleteFromBin(item.id)} src="/todo-list/img/delete.png" alt="delete" width={25} height={25}/>
                                            </aside>
                                        </div>
                                    ))
                                }
                                </>
                            }
                        </div>
                        <div className="delete">
                            <button onClick={onDeleteDoneTask}>Delete done tasks</button>
                            <button onClick={onDeleteAllTasks}>Delete all tasks</button>
                        </div>
                    </>
                }
            </div>
        </>
  )
}
