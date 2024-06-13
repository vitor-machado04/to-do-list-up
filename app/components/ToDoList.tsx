'use client';

// import { ITask } from '@/types/tasks';
// import Task from './Task';
// import React from 'react';

// interface ToDoListProps {
//     tasks: ITask[];
// }

// const ToDoList: React.FC<ToDoListProps> = ({ tasks }) => {
//     const openTasks = tasks.filter(task => !task.status);
//     const closedTasks = tasks.filter(task => task.status);

//     return (
//         <div className="overflow-x-auto">
//             <h2 className='font-bold text-xl mb-5'>Tarefas Abertas</h2>
//             <table className="table">
//                 <tbody className='text-lg'>
//                     {openTasks.map(task => <Task key={task.id} task={task} />)}
//                 </tbody>
//             </table>

//             <h2 className='font-bold text-xl mb-5 mt-8'>Tarefas Concluídas</h2>
//             <table className="table">
//                 <tbody className='text-lg'>
//                     {closedTasks.map(task => <Task key={task.id} task={task} />)}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ToDoList;

import { ITask } from '@/types/tasks';
import Task from './Task';
import React, { useState } from 'react';

interface ToDoListProps {
    tasks: ITask[];
}

const ToDoList: React.FC<ToDoListProps> = ({ tasks }) => {
    const [filterDate, setFilterDate] = useState<string>('');

    const openTasks = tasks.filter(task => !task.status && (!filterDate || new Date(task.createdAt).toDateString() === new Date(filterDate).toDateString()));
    const closedTasks = tasks.filter(task => task.status);

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-between items-center mb-5">
                <h2 className='font-bold text-xl'>Tarefas Abertas</h2>
                <input 
                    type="date" 
                    className="input input-bordered w-full max-w-xs"
                    value={filterDate}
                    onChange={e => setFilterDate(e.target.value)}
                />
            </div>
            <table className="table">
                <tbody className='text-lg'>
                    {openTasks.map(task => <Task key={task.id} task={task} />)}
                </tbody>
            </table>

            <h2 className='font-bold text-xl mb-5 mt-8'>Tarefas Concluídas</h2>
            <table className="table">
                <tbody className='text-lg'>
                    {closedTasks.map(task => <Task key={task.id} task={task} />)}
                </tbody>
            </table>
        </div>
    );
}

export default ToDoList;
