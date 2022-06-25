import { IToDo } from "../atoms";

export default function Todo( {text, category}: IToDo) {
    return (
        <li>
            <span>{text}</span>
            <button>To Do</button>
            <button>Doing</button>
            <button>Done</button>
        </li>
    )
}