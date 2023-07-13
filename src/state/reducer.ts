import { CountAction } from "./actions"

export interface ToDoState { 
  id: number; 
  task?: string; 
  completed: boolean;
  title: string;
  userId?: number;
}

type ReducerAction = {
  type: CountAction;
  payload: any;
}

interface State {
  todos: ToDoState[];
}

export const initialState: State = {
  todos: []
}

export const reducer = (state = initialState, action: ReducerAction) => {
  switch (action.type) {
    case CountAction.SET_TODOS_TYPE:
      console.log('sssss', action)

      return {
        ...state,
        todos: action.payload
      }
    case CountAction.ADD_TODO_TYPE:
      console.log(action)
      return {
        ...state,
        todos: [...state.todos, action] 
      }
    case CountAction.UPDATE_TODO_TYPE:
      console.log('1111', action)
      const todoIndex = state.todos.findIndex((item) => item.id === action.payload.id)
      return {
        ...state,
        todos: [...state.todos.slice(0, todoIndex), action.payload, ...state.todos.slice(todoIndex + 1)]
      }
    case CountAction.DELETE_TODO_TYPE:
      console.log('2222', action)
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    default:
      return state
  }
}
