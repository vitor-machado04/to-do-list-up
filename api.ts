import { ITask } from "./types/tasks";

const baseURL = "http://localhost:4000/api/task";

// export const getAllToDoList = async (date?: string): Promise<ITask[]> => {
//     const url = new URL(`${baseURL}/getAll`);
//     if (date) {
//         url.searchParams.append('createdAt', date);
//     }

//     const res = await fetch(url.toString(), { cache: 'no-store' });
//     const toDo = await res.json();
//     return toDo;
// }

export const getAllToDoList = async (date?: string): Promise<ITask[]> => {
    try {
        const url = new URL(`${baseURL}/getAll`);
        if (date) {
            url.searchParams.append('createdAt', date);
        }

        const res = await fetch(url.toString(), { cache: 'no-store' });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const toDo = await res.json();
        return toDo;
    } catch (error) {
        console.error("Erro ao obter tarefas: ", error);
        return [];
    }
}


// export const addToDo = async (toDo: ITask): Promise<ITask> => {
//     const res = await fetch(`${baseURL}/tasks`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(toDo)
//     });

//     const newToDo = await res.json();
//     return newToDo;
// }

export const addToDo = async (toDo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseURL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id: toDo._id,
            status: toDo.status,
            description: toDo.description,
            createdAt: new Date(toDo.createdAt),
            updatedAt: new Date(toDo.updatedAt) 
        })
    });

    const newToDo = await res.json();
    return newToDo;
}


// export const editToDo = async (toDo: ITask): Promise<ITask> => {
//     const res = await fetch(`${baseURL}/tasks/${toDo.id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(toDo)
//     });
//     const updatedToDo = await res.json();
//     return updatedToDo;
// }

export const editToDo = async (toDo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseURL}/update/${toDo._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id: toDo._id,
            status: !toDo.status,
            description: toDo.description
        })
    });
    const updatedToDo = await res.json();
    return updatedToDo;
}


// export const deleteToDo = async (id: string): Promise<void> => {
//     await fetch(`${baseURL}/tasks/${id}`, {
//         method: 'DELETE',
//     });
// }

export const deleteToDo = async (id: string): Promise<void> => {
    await fetch(`${baseURL}/delete/${id}`, {
        method: 'DELETE',
    });
}

