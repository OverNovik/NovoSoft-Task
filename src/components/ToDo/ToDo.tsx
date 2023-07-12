import { ToDoState } from '../Main/Main';
import './ToDo.sass';

interface ToDoProps {
  todo: ToDoState;
  toggleTask: (id: number) => void; 
  removeTask: (id: number) => void;
}

const ToDo: React.FC<ToDoProps> = ({todo, toggleTask, removeTask}) => {
  return (
    <div
      key={todo.id}
      className='todo-item'
    >
      <div
        className={todo.complete ? 'todo-item__container cross-out' : 'todo-item__container'}
        onClick={() => toggleTask(todo.id)}
      >
        <input type='checkbox' className='todo-item__check' />
        <span className='todo-item__text'>{todo.task}</span>
      </div>
      <div className='todo-item__toolbar'>
        <button
          className='todo-item__toolbar__edit'
        >
          <img src='assets/edit.png' alt='edit' />
        </button>
        <button
          className='todo-item__toolbar__copy'
        >
          <img src='assets/copy.png' alt='copy' />
        </button>
        <button
          className='todo-item__toolbar__delete'
          onClick={() => removeTask(todo.id)}
        >
          <img src='assets/garbage.png' alt='delete' />
        </button>
      </div>
    </div>
  )
}

export default ToDo;
