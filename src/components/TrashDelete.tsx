import { Droppable } from "react-beautiful-dnd"
import styled, { css, keyframes } from "styled-components"

const ani_vibrate = keyframes`
    0%{
        transform: rotate(0deg);
    }
    10%{
        transform: rotate(45deg);
    }
    20%{
        transform: rotate(-45deg);
    }
    30%{
        transform: rotate(30deg);
    }
    40%{
        transform: rotate(-30deg);
    }
    50%{
        transform: rotate(10deg);
    }
    60%{
        transform: rotate(-10deg);
    }
    70%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(0deg);
    }
`

interface ITrashStyle {
    isDraggingOver: boolean;
    isDraggingEnd: boolean;
}

const Trash = styled.div< ITrashStyle >`
    background-color: #00b894; 
    width: 100px;
    height: 200px;
    margin-top: 30px;
    border-radius: 20px;
    text-align: center;
    animation: ${ props => props.isDraggingEnd ? css`${ani_vibrate} 2s 0.5s forwards` : "none" };
    transform: ${ props => props.isDraggingOver ? "scale(1.1)" : "scale(1.0)" };
    transition: transform 0.3s ease-in-out;

    span {
        color: white;
        line-height: 200px;
        font-weight: 700;
    }
`

interface ITrashDelete {
    isDraggingEnd: boolean;
}

export default function TrashDelete ({ isDraggingEnd} :ITrashDelete) {
    return (
        <Droppable droppableId="delete" type="CARD">
            {(magic,snapshot) => 
                (<Trash isDraggingEnd={isDraggingEnd} ref={magic.innerRef} isDraggingOver={snapshot.isDraggingOver} {...magic.droppableProps}>
                    <span>Delete</span>
                    {magic.placeholder}
                </Trash>)
            }
        </Droppable>
    )
}
