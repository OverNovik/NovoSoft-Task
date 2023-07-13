import { ReactNode, createContext, useReducer } from "react"
import { toDoService } from "../services/todo.service";
import { CountAction } from "../state/actions";
import { ToDoState, initialState, reducer } from "../state/reducer"

export interface ToDoCont {
  getToDoList: () => Promise<void>;
  toDoList: ToDoState[];
  updateToDo: (todo: ToDoState) => Promise<void>; 
  deleteToDo: (id: number) => Promise<void>;
  createToDo: (todoTitle: string) => Promise<void>;
}
 
export const ToDoContext = createContext(null as unknown as ToDoCont);

export const Provider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getToDoList = async () => {
    const response = await toDoService.get()
    dispatch({
      type: CountAction.SET_TODOS_TYPE,
      payload: response
    })
  };

  const createToDo = async (todoTitle: string) => {
    const response = await toDoService.post({
      title: todoTitle,
      completed: false
    })
    dispatch({
      type: CountAction.ADD_TODO_TYPE,
      payload: response
    })
  }

  const updateToDo = async (todo: ToDoState) => {
    console.log(todo)
    const response = await toDoService.update(todo)
    dispatch({
      type: CountAction.UPDATE_TODO_TYPE,
      payload: response
    })
  }

  const deleteToDo = async (id: number) => {
    console.log(id)
    await toDoService.delete(id)
    dispatch({
      type: CountAction.DELETE_TODO_TYPE,
      payload: id
    })
  }

  return (
    <ToDoContext.Provider value={{
      toDoList: state.todos,
      getToDoList,
      createToDo,
      updateToDo,
      deleteToDo
    }}>
      {children}
    </ToDoContext.Provider>
  )
}