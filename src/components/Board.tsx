import { Droppable } from "react-beautiful-dnd";
import { DragabbleCard } from "./DraggableCard";
import styled from "styled-components";

interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

const Wrapper = styled.div<IAreaProps>`
    background-color: ${props => (props.isDraggingOver ? "pink" : props.isDraggingFromThis ? "red" : props.theme.boardColor )};
    padding: 20px;
    border-radius: 5px;
    min-height: 200px;
    transition: background-color 0.3s ease-in-out;
`

interface IBoardProps {
    todos: string[];
    boardId: string;
}

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

function Board ({todos, boardId }: IBoardProps) {

    return (
        <Droppable droppableId={boardId} >
            {(magic, snapshot) => (
                <Wrapper isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} isDraggingOver={snapshot.isDraggingOver} ref={magic.innerRef} {...magic.droppableProps}>
                    <Title>{boardId}</Title>
                    {todos.map((todo, index) => (
                        <DragabbleCard key={todo} index={index} todo={todo}/>
                    ))}
                    {magic.placeholder}
                </Wrapper>
            )}
        </Droppable>
    )
}

export default Board;