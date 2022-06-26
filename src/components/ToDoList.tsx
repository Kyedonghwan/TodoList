import { useEffect } from "react";
import { useRecoilValue} from "recoil";
import { toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import Select from "./Select";
import ToDo from "./ToDo";

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const totalToDos = useRecoilValue(toDoState);

    useEffect(()=> {
        localStorage.setItem("todos", JSON.stringify(totalToDos));
    },[totalToDos]);

    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <Select />
            <CreateToDo />
            {toDos.map(todo => (
                <ToDo key={todo.id} {...todo} />
            ))}
        </div>
    )
}

export default ToDoList;