import React from "react";
import { useRecoilState, useRecoilValue} from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (e:React.FormEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value as any);
    }

    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <select onInput={onInput}>
                <option value={Categories.TODO}>To Do</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
            </select>
            <CreateToDo />
            {toDos.map(todo => (
                <ToDo key={todo.id} {...todo} />
            ))}
        </div>
    )
}

export default ToDoList;