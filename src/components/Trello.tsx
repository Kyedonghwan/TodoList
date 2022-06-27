import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { trelloTodoState } from "../atoms";

const Board = styled.div`
    background-color: ${props => props.theme.boardColor};
    padding: 20px;
    border-radius: 5px;
    min-height: 200px;
`

const Card = styled.div`
    background-color: ${props => props.theme.cardColor};
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 5px;
`

const Wrapper = styled.div`
    display: flex;
    max-width: 470px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const Boards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, fr);
`

const todos = ["a", "b", "c", "d"];

const Trello = () => {

    const [todos, setTodos] = useRecoilState(trelloTodoState);

    const onDragEnd = ({draggableId, destination, source}:DropResult) => {
        if(!destination) return;
        setTodos(oldTodos => {
            const copyToDos = [...oldTodos];
            copyToDos.splice(source.index, 1);
            copyToDos.splice(destination?.index, 0, draggableId);
            return copyToDos;
        })
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    <Droppable droppableId="one">
                        {(magic) => (
                            <Board ref={magic.innerRef} {...magic.droppableProps}>
                                {todos.map((todo, index) => (
                                    <Draggable key={todo} draggableId={todo} index={index}>
                                        {(magic) => <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>{todo}</Card>}
                                    </Draggable>
                                ))}
                                {magic.placeholder}
                            </Board>
                        )}
                    </Droppable>
                </Boards>
            </Wrapper>
        </DragDropContext>
    )
}

export default Trello;