'use client';

import { ITask } from '@/types/tasks';
import Task from './Task';
import React, { useState } from 'react';

interface ToDoListProps {
    tasks: ITask[];
}

const ToDoList: React.FC<ToDoListProps> = ({ tasks }) => {
    const [filterDate, setFilterDate] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredTasks = tasks.filter(task => 
        (searchTerm === '' || task.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!filterDate || new Date(task.createdAt).toDateString() === new Date(filterDate).toDateString())
    );

    const openTasks = filteredTasks.filter(task => !task.status);
    const closedTasks = filteredTasks.filter(task => task.status);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-between items-center mb-5">
                <input 
                    className="input input-bordered w-full max-w-xs" 
                    placeholder="Pesquisar por tarefa"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <input
                    type="date"
                    className="input input-bordered"
                    value={filterDate}
                    onChange={e => setFilterDate(e.target.value)}
                />
            </div>
            <h2 className='font-bold text-xl'>Tarefas Abertas</h2>
            <table className="table">
                <tbody className='text-lg'>
                    {openTasks.map(task => <Task key={task._id} task={task} />)}
                </tbody>
            </table>

            <h2 className='font-bold text-xl mb-5 mt-8'>Tarefas Concluídas</h2>
            <table className="table">
                <tbody className='text-lg'>
                    {closedTasks.map(task => <Task key={task._id} task={task} />)}
                </tbody>
            </table>
        </div>
    );
}

export default ToDoList;
