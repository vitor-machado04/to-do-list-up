import { ITask } from '@/types/tasks'
import Task from './Task'
import React from 'react'

interface ToDoListProps {
    tasks: ITask[]
}

const ToDoList: React.FC<ToDoListProps> = ({ tasks }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Tarefa</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => <Task key={task.id} task={task}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default ToDoList
