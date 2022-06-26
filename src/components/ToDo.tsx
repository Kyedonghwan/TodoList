
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

export default function Todo( {text, category, id}: IToDo) {
    const setToDos = useSetRecoilState(toDoState);

    const onClick = (newCategory : IToDo["category"]) => {
        setToDos( (oldTodos) => {
            const targetIndex = oldTodos.findIndex(todo => todo.id === id);
            const newTodo = {text, id, category: newCategory};
            return [...oldTodos.slice(0, targetIndex), newTodo, ...oldTodos.slice(targetIndex+1)];
        })
    }

    const onClickDelete = () => {
        setToDos( (oldTodos) => {
            const targetIndex = oldTodos.findIndex(todo => todo.id ===id );
            return [...oldTodos.slice(0,targetIndex),...oldTodos.slice(targetIndex+1)];
        })
    }

    return (
        <li>
            <span>{text}</span>
            {category !== Categories.TODO && <button onClick={() => onClick(Categories.TODO)}>To Do</button>} 
            {category !== Categories.DOING && <button onClick={() => onClick( Categories.DOING)}>Doing</button>}
            {category !== Categories.DONE && <button onClick={() => onClick( Categories.DONE)}>Done</button>}
            <button onClick={onClickDelete}>delete</button>
        </li>
    )
}