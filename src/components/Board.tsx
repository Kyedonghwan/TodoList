import { Droppable } from "react-beautiful-dnd";
import { DragabbleCard } from "./DraggableCard";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ITrelloTodo, trelloTodoState } from "../atoms";
import { useSetRecoilState } from "recoil";

interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

const Wrapper = styled.div<IAreaProps>`
    background-color: ${props => (props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : props.theme.boardColor )};
    padding: 20px;
    border-radius: 5px;
    min-height: 200px;
    transition: background-color 0.3s ease-in-out;
`

interface IBoardProps {
    todos: ITrelloTodo[];
    boardId: string;
}

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IForm {
    toDo: string;
}

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
`

function Board ({todos, boardId }: IBoardProps) {

    const {register, setValue, handleSubmit} = useForm<IForm>();

    const setToDos = useSetRecoilState(trelloTodoState);

    const onValid = ( {toDo}: IForm) => {
        const newTodo = {
            id: Date.now(),
            text: toDo
        };

        setToDos(allBoards => {
            return {
                ...allBoards,
                [boardId]: [...allBoards[boardId],newTodo]
            }
        })
        setValue("toDo" , "");
    }

    return (
        <Droppable droppableId={boardId} >
            {(magic, snapshot) => (
                <Wrapper isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} isDraggingOver={snapshot.isDraggingOver} ref={magic.innerRef} {...magic.droppableProps}>
                    <Title>{boardId}</Title>
                    <Form onSubmit={handleSubmit(onValid)}>
                        <input {...register("toDo", {required : true })}type="text" placeholder={`Add task on ${boardId}`} />
                    </Form>
                    {todos.map((todo, index) => (
                        <DragabbleCard key={todo.id} index={index} todoId={todo.id} todoText={todo.text}/>
                    ))}
                    {magic.placeholder}
                </Wrapper>
            )}
        </Droppable>
    )
}

export default Board;