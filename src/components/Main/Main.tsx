import './Main.sass';
import {useContext, useEffect} from 'react';
import ToDo from '../ToDo/ToDo';
import ToDoForm from '../ToDoForm/ToDoForm';
import { ToDoContext } from '../../provider/Provider';
import { ToDoState } from '../../state/reducer';

const Main: React.FC = () => {
  const {getToDoList, toDoList, updateToDo, deleteToDo, createToDo} = useContext(ToDoContext)

  useEffect(() => {
    getToDoList()
  }, [])

  const addTask = async (tasksInput: string) => {
    if (tasksInput) {
      createToDo(tasksInput)
    }
  }

  const handleToggle = (todo: ToDoState) => {
    updateToDo({
      ...todo,
      completed: !todo.completed
    })
  }

  const handleChangeToDo = (todo: ToDoState) => {
    updateToDo(todo)
  }

  const inProgressToDoList = (todos: ToDoState[]) => todos.filter(item => !item.completed)

  const completeToDoList = (todos: ToDoState[]) => todos.filter(item => item.completed)

  return (
    <main className='main'>
      <div className='main-todo__list'>
        <div className='main-task__add'>
          <ToDoForm addTask={addTask}/>
          <span className='main-task__total'>Total: {toDoList.length}</span>
          <h2 className='main-task__title'>To do ({inProgressToDoList(toDoList).length})</h2>
          {inProgressToDoList(toDoList).map(item => {
            return (
              <ToDo
                key={item.id}
                todo={item}
                toggleTask={handleToggle}
                removeTask={deleteToDo}
                updateTask={handleChangeToDo}
              />
            )
          })}
        </div>
        <div className='main-task__complete'>
          <h2 className='main-task__complete__title'>Completed ({completeToDoList(toDoList).length})</h2>
          {completeToDoList(toDoList).map(item => {
            return (
              <ToDo
                key={item.id}
                todo={item}
                toggleTask={handleToggle}
                removeTask={deleteToDo}
                updateTask={updateToDo}
              />
            )
          })}
        </div>
      </div>
    </main>
  );
}

export default Main;