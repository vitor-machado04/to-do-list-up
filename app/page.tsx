import AddTask from "./components/AddTask";
import { getAllToDoList } from "@/api";
import ToDoList from "./components/ToDoList";
import Footer from "./components/footer";

export default async function Home() {
  const tasks = await getAllToDoList();
  console.log(tasks);
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <div className="flex justify-center items-center gap-4">
          <h1 className="text-2xl font-bold">Lista de Tarefas</h1>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              Tema
              <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
              <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Cyberpunk" value="cyberpunk" /></li>
              <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine" value="valentine" /></li>
              <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Wave" value="synthwave" /></li>
              <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dracula" value="dracula" /></li>
              <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="dark" /></li>
              <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Light" value="fantasy" /></li>
              <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Black" value="black" /></li>
            </ul>
          </div>
        </div>
        <AddTask />
      </div>
      <ToDoList tasks={tasks} />
      <Footer />
    </main>
  );
}
