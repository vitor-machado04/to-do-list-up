import { ITask } from "./types/tasks";

const baseURL = "http://localhost:3001";

export const getAllToDoList = async (date?: string): Promise<ITask[]> => {
    const url = new URL(`${baseURL}/tasks`);
    if (date) {
        url.searchParams.append('createdAt', date);
    }

    const res = await fetch(url.toString(), { cache: 'no-store' });
    const toDo = await res.json();
    return toDo;
}

export const addToDo = async (toDo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseURL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toDo)
    });

    const newToDo = await res.json();
    return newToDo;
}

export const editToDo = async (toDo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseURL}/tasks/${toDo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toDo)
    });
    const updatedToDo = await res.json();
    return updatedToDo;
}

export const deleteToDo = async (id: string): Promise<void> => {
    await fetch(`${baseURL}/tasks/${id}`, {
        method: 'DELETE',
    });
}
