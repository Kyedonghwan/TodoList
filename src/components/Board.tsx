import { Draggable, Droppable } from "react-beautiful-dnd";
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
    transition: background-color 0.3s ease-in-out;
`

interface IBoardProps {
    todos: ITrelloTodo[];
    boardId: string;
    index: number;
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

const CardWrapper = styled.div`
`

const DraggableBoard = styled.div`
    padding: 20px;
    border-radius: 5px;
    min-height: 200px;
    background-color: ${props => props.theme.boardColor};
    position: relative;

    input {
        border: 0;
        border-radius: 5px;
        padding: 5px;
        margin-bottom: 10px;
    }

    span {
        position: absolute;
        right: 10px;
        top: 20px;
        transition: transform 0.3s ease-in-out;

        &:hover {
            transform: scale(1.4);
        }
    }
`

function Board ({todos, boardId, index }: IBoardProps) {

    const {register, setValue, handleSubmit} = useForm<IForm>();

    const setToDos = useSetRecoilState(trelloTodoState);

    const deleteBorder = () => {
        console.log(boardId);
        setToDos(oldTodosObj => {
            let boardList = Object.keys(oldTodosObj).filter((boardName)=>{
                return boardId !==boardName
            });
            
            let boards = {};

            boardList.map(board => {
                boards = {...boards, [board]: oldTodosObj[board] }
            });

            console.log(boards);
            return boards;
        });
    }

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
        <Draggable draggableId={boardId + ""} index={index}>
             {(magic) => 
                <DraggableBoard ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                    <Title>{boardId}</Title>
                    <span onClick={deleteBorder}>❌</span>
                    <Form onSubmit={handleSubmit(onValid)}>
                        <input {...register("toDo", {required : true })}type="text" placeholder={`Add task on ${boardId}`} />
                    </Form>
                    <CardWrapper>
                        <Droppable droppableId={boardId} direction="vertical" type="CARD">
                            {(magic, snapshot) => (
                                <Wrapper isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} isDraggingOver={snapshot.isDraggingOver} ref={magic.innerRef} {...magic.droppableProps}>
                                    {todos.map((todo, index) => (
                                        <DragabbleCard key={todo.id} index={index} todoId={todo.id} todoText={todo.text}/>
                                    ))}
                                    {magic.placeholder}
                                </Wrapper>
                            )}
                        </Droppable>
                    </CardWrapper>
                </DraggableBoard>
             }
        </Draggable>
    )
}

export default Board;