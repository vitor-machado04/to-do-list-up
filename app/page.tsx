import AddTask from "./components/AddTask";
import { getAllToDoList } from "@/api";
import ToDoList from "./components/ToDoList";

export default async function Home() {
  const tasks = await getAllToDoList();
  console.log(tasks);
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Lista de Tarefas</h1>
        <AddTask />
      </div>
        <ToDoList tasks={tasks} />
    </main>
  );
}
