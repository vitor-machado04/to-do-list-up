import { ITask } from "./types/tasks";

const baseURl = "http://localhost:3001";

export const getAllToDoList = async (): Promise<ITask[]> => {
    const res = await fetch(`${baseURl}/tasks`, { cache: 'no-store' });
    const toDo = await res.json();
    return toDo;
}

export const addToDo = async (toDo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseURl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toDo)
    });

    const newToDo = res.json();
    return newToDo;
}

export const editToDo = async (toDo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseURl}/tasks/${toDo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toDo)
    });

    const updatedToDo = res.json();
    return updatedToDo;
}

export const deleteToDo = async (id: string): Promise<void> => {
    await fetch(`${baseURl}/tasks/${id}`, {
        method: 'DELETE',
    });
}