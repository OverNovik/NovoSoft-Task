import { USER_ID } from '../common/constans';

class ToDoService {
  private url = 'https://jsonplaceholder.typicode.com/todos';

  async get() {
    const response = await fetch(`${this.url}?userId=${USER_ID}`)
    const data = await response.json()
    return data
  }

  async post(payload: {completed: Boolean, title: string}) {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        userId: USER_ID,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    const data = await response.json()
    return data
  }

  async update(payload: { id: number }) {
    const response = await fetch(`${this.url}/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    const data = await response.json()
    return data
  }

  async delete(id: number) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json()
    return data
  }
}

export const toDoService = new ToDoService();