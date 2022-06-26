import { atom, selector } from "recoil";

export interface IToDo {
    text: string;
    id: number;
    category: Categories;
}

export enum Categories {
    "TODO"="TODO",
    "DOING"="DOING",
    "DONE"="DONE"
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TODO
})

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: JSON.parse(localStorage.getItem("todos") || '[]')
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter(todo => todo.category === category);
    }
})