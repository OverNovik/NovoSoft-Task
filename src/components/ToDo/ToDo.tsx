import { useEffect, useState } from 'react';
import { ToDoState } from '../../state/reducer';
import Garbage from '../../assets/garbage.png';
import Edit from '../../assets/edit.png';
import './ToDo.sass';

interface ToDoProps {
  todo: ToDoState;
  toggleTask: (todo: ToDoState) => void; 
  removeTask: (id: number) => void;
  updateTask: (todo: ToDoState) => void;
}

const ToDo: React.FC<ToDoProps> = ({todo, toggleTask, removeTask, updateTask}) => {
  const [isEdit, setEdit] = useState(false)
  const [title, setTitle] = useState('')

  useEffect(() => {
    setTitle(todo.title)
  }, [todo])

  const handleEdit = () => {
    setEdit(true)
  }

  const handleSaveChanges = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateTask({
        ...todo,
        title
      })
      setEdit(false)
    }
  }

  const handleChange = (e: any) => {
    setTitle(e.target.value)
  }

  return (
    <div
      key={todo.id}
      className='todo-item'
    >
      <div
        className={todo.completed ? 'todo-item__container cross-out' : 'todo-item__container'}
      >
        <input 
          type='checkbox' 
          className='todo-item__check' 
          onClick={() => toggleTask(todo)}
          defaultChecked={todo.completed}
        />
        {isEdit ? <input value={title} onKeyDown={(e) => handleSaveChanges(e)} onChange={handleChange} className='todo-item__text__inp'/> : <span className='todo-item__text'>{title}</span>}
      </div>
      <div className='todo-item__toolbar'>
        <button
          className='todo-item__toolbar__edit'
          onClick={handleEdit}
          style={!todo.completed ? {display: 'block'} : {display: 'none'}}
        >
          <img src={Edit} alt='edit' />
        </button>
        <button
          className='todo-item__toolbar__delete'
          onClick={() => removeTask(todo.id)}
        >
          <img src={Garbage} alt='delete' />
        </button>
      </div>
    </div>
  )
}

export default ToDo;
