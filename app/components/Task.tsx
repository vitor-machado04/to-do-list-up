'use client';

import { ITask } from "@/types/tasks"
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteToDo, editToDo } from "@/api";
import moment from "moment";

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter()
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.description);

    const handleSubmitEditToDo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editToDo({
            _id: task._id,
            description: taskToEdit,
            status: !task.status,
            createdAt: task.createdAt,
            updatedAt: new Date(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:MM:SS').toString()),
        });
        setOpenModalEdit(false);
        router.refresh();
    }

    const handleDeleteTask = async (id: string) => {
        await deleteToDo(id);
        setOpenModalDeleted(false);
        router.refresh();
    }

    const handleToggleStatus = async () => {
        await editToDo({
            _id: task._id,
            description: task.description,
            status: !task.status,
            createdAt: task.createdAt,
            updatedAt: new Date(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:MM:SS').toString()),
            
        });
        router.refresh();
    };

    return (
        <tr key={task._id}>
            <td className="w-full">{task.description}</td>
            <td className="flex gap-5">
                <span className="label-text">Concluída?</span>
                <input type="checkbox" checked={task.status} onChange={handleToggleStatus} className="checkbox border-orange-400 checked:border-indigo-800 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange]" />
                <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={18} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditToDo}>
                        <h3 className="font-bold text-lg">Editar tarefa</h3>
                        <div className="modal-action">
                            <input value={taskToEdit} onChange={e => setTaskToEdit(e.target.value)} type="text" placeholder="Descreva a tarefa" className="input input-bordered w-full" />
                            <button type="submit" className="btn ">Enviar</button>
                        </div>
                    </form>
                </Modal>
                <FaTrashAlt onClick={() => setOpenModalDeleted(true)} cursor="pointer" className="text-red-500" size={18} />
                <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                    <h3 className="text-lg">Você tem certeza que deseja deletar esta tarefa?</h3>
                    <div className="modal-action">
                        <button onClick={() => handleDeleteTask(task._id)} className="btn">Sim</button>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}

export default Task