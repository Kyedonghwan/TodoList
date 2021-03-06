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

//단위 변환

export const minuteState = atom({
    key: "minutes",
    default: 0,
})

export const hoursSelector = selector<number>({
    key: "hoursSelector",
    get: ({get}) => {
        const minutes = get(minuteState);
        return minutes/60;
    },
    set: ({set}, newValue) => {
        const minutes = Number(newValue) * 60;
        set(minuteState, minutes);
    }
})

// Trello 

interface IToDoState {
    [key : string]: ITrelloTodo[];
}

export interface ITrelloTodo {
    id:number;
    text:string;
}

export const trelloTodoState = atom<IToDoState>({
    key: "toDo",
    default: JSON.parse(localStorage.getItem("todosObj") || '{}')
})