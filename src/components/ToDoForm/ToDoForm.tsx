import {FormEvent, useState} from 'react';
import './ToDoForm.sass';

interface ToDoFormProps {
  addTask: (tasksInput: string) => void;
}

const ToDoForm: React.FC<ToDoFormProps> = ({addTask}) => {
  const [tasksInput, setTasksInput] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    addTask(tasksInput)
    setTasksInput('')
  }

  const handleChange = (e: FormEvent) => {
    let target = e.currentTarget as HTMLInputElement;
    setTasksInput(target.value)
  }

  const handleKeySubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <form className="todo" onSubmit={handleSubmit}>
      <input 
        value={tasksInput}
        type='text'
        onChange={handleChange}
        onKeyDown={handleKeySubmit}
        placeholder='+ Add a task, press Enter to save'
        className='todo-text__inp'
      />
      <button className='todo-sub__btn'>Add</button>
    </form>
  )
}

export default ToDoForm;