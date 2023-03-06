import React from 'react';
import axios from 'axios';

import './index.scss';
import { AddNew } from './components/AddNew';
import { List } from './components/List';

export const AppContext = React.createContext({});

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [toDoItem, setToDoItem] = React.useState([]);
  const [inputToDo, setInputToDo] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);
  const [id, setId] = React.useState(1);
  const [statusId, setStatusId] = React.useState(0);

  const filterClick = (index) => {
    async function fetchData(){
      setIsLoading(true);  
      const buttonResponse = await axios.get(`https://63f6813d9daf59d1ad8a1d22.mockapi.io/list${index === 0 ? `` : index === 1 ? `?checked=true` : `?checked=false`}`);
      setIsLoading(false);
      setToDoItem(buttonResponse.data);
    }
    setStatusId(index);
    fetchData();
  }
  
  const addToList = () => {
    if (inputToDo.trim() !== '') {
      let newId = id;
      if(toDoItem.find((item) => item.id >= id)){
        let maxId = Math.max(...toDoItem.map((item) => item.id));
        newId = maxId + 1;
      }
      if(toDoItem.length === 0){
        newId = 1;
        setId(newId);
      }
      try{
        let toDo_list = {"id": `${newId}`, "todo": `${inputToDo}`, "checked": isChecked};
        axios.post(`https://63f6813d9daf59d1ad8a1d22.mockapi.io/list`, toDo_list);
        setToDoItem((prev) => [...prev, toDo_list]);
        setId(newId + 1);
      }catch(error){
        alert('Не вдалось додати до списку')
      }
      setInputToDo('');
    }
  }

  const onDeleteFromBin = (id) => {
    axios.delete(`https://63f6813d9daf59d1ad8a1d22.mockapi.io/list/${id}`);
    setToDoItem(prev => [...prev.filter((item) => Number(item.id) !== Number(id))]);
  }

  const onDeleteDoneTask = () => {
    toDoItem.forEach((item) => {
      if(item.checked === true){
        axios.delete(`https://63f6813d9daf59d1ad8a1d22.mockapi.io/list/${item.id}`);
        setToDoItem(prev => [...prev.filter((item) => Number(item.checked) === true)]);
      }
    })
    alert('Видалили лише виконані завдання');
  }

  const onDeleteAllTasks = () => {
    toDoItem.forEach((item) => {
        axios.delete(`https://63f6813d9daf59d1ad8a1d22.mockapi.io/list/${item.id}`);
        setToDoItem([]);
    })
    alert('Видалили усі завдання');
  }

  const onInputSubmit = (e) => {
    e.preventDefault();
    addToList();
  }

  const isItemChecked = (id) => {
    return toDoItem.some(obj => Number(obj.id) === Number(id));
  }

  return (
    <>
      <AppContext.Provider value={{isLoading, setIsLoading, toDoItem, setToDoItem, inputToDo, setInputToDo, onInputSubmit,
      isItemChecked, isChecked, setIsChecked, statusId, filterClick}}>
        <AddNew />
        <List onDeleteFromBin={onDeleteFromBin} onDeleteDoneTask={onDeleteDoneTask} onDeleteAllTasks={onDeleteAllTasks}/>
      </AppContext.Provider>
    </>
  );
}

export default App;
