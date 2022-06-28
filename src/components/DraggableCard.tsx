import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
    background-color: ${props => props.isDragging ? "#0984e3" : props.theme.cardColor};
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 5px;
    box-shadow: ${props => props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"}
`

interface IDragabbleCardProps {
    todoId: number;
    todoText: string;
    index: number;
}

export function DragabbleCard ({todoId, todoText, index}: IDragabbleCardProps) {
    return (
        <Draggable draggableId={todoId + ""} index={index}>
            {(magic, snapshot) => <Card isDragging={snapshot.isDragging} ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>{todoText}</Card>}
        </Draggable>
    )
}