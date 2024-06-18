'use client';

import { CiSquarePlus } from "react-icons/ci";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addToDo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment-timezone";
import 'moment/locale/pt-br';

function AddTask() {
  moment.locale('pt-br');
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');

  const handleSubmitNewToDo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addToDo({
      id: uuidv4(),
      description: newTaskValue,
      status: false,
      createdAt: new Date(moment.tz('America/Sao_Paulo').format('YYYY-MM-DD 00:00:00').toString()),
      updatedAt: new Date(moment.tz('America/Sao_Paulo').format('YYYY-MM-DD 00:00:00').toString())

    });
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  }

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full">
        Adicionar nova tarefa <CiSquarePlus size={25} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewToDo}>
          <h3 className="font-bold text-lg">Adiconar nova tarefa</h3>
          <div className="modal-action">
            <input value={newTaskValue} onChange={e => setNewTaskValue(e.target.value)} type="text" placeholder="Descreva a tarefa" className="input input-bordered w-full" />
            <button type="submit" className="btn ">Enviar</button>
          </div>
        </form>
      </Modal>
    </div>

  )
}

export default AddTask