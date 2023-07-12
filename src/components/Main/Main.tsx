import './Main.sass';
import {useState} from 'react';
import ToDo from '../ToDo/ToDo';
import ToDoForm from '../ToDoForm/ToDoForm';

export interface ToDoState { 
  id: number; 
  task: string; 
  complete: boolean; 
}

const Main: React.FC = () => {
  const [todo, setTodo] = useState<ToDoState[]>([])

  const addTask = (tasksInput: string) => {
    if (tasksInput) {
      const newItem = {
        id: Math.round(Math.random() * 1000000),
        task: tasksInput,
        complete: false
      }
      setTodo([...todo, newItem])
    }
  }

  const removeTask = (id: number) => {
    setTodo([...todo.filter(item => item.id !== id)])
  }

  const handleToggle = (id: number) => {
    setTodo([
      ...todo.map(item => 
        item.id === id ? {...item, complete: !item.complete} : {...item}
      )
    ])
    console.log(todo)
  }

  return (
    <main className='main'>
      <div className='main-todo__list'>
        <div className='main-task__add'>
          <ToDoForm addTask={addTask}/>
          <span className='main-task__total'>Total: {todo.length}</span>
          <h2 className='main-task__title'>To do ({todo.length})</h2>
          {todo.map(item => {
            return (
              <ToDo
                key={item.id}
                todo={item}
                toggleTask={handleToggle}
                removeTask={removeTask}
              />
            )
          })}
        </div>
        <div className='main-task__complete'>
          <h2 className='main-task__complete__title'>Completed ({todo.length})</h2>
        </div>
      </div>
    </main>
  );
}

export default Main;