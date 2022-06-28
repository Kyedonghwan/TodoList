import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { trelloTodoState } from "../atoms";
import Board from "./Board";

const Wrapper = styled.div`
    display: flex;
    max-width: 470px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
    max-width: 680px;
`

const Boards = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
`

const Trello = () => {

    const [todosObj, setTodosObj] = useRecoilState(trelloTodoState);

    const onDragEnd = (info: DropResult) => {
        const {destination, draggableId, source } = info;

        if(!destination) return;

        if(destination?.droppableId === source.droppableId ) {
            setTodosObj(oldTodosObj => {
                const boardCopy = [...oldTodosObj[source.droppableId]];
                const taskObj = boardCopy[source.index];

                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination.index, 0, taskObj);
                return {
                    ...oldTodosObj,
                    [source.droppableId]: boardCopy
                }
            })
        }

        if(destination?.droppableId !== source.droppableId ){
            // cross board movement
            setTodosObj(oldTodoObj => {
                const sourceCopy = [...oldTodoObj[source.droppableId]];
                const destinationCopy = [...oldTodoObj[destination.droppableId]];

                const taskObj = sourceCopy[source.index];

                sourceCopy.splice(source.index, 1);
                destinationCopy.splice(destination.index, 0, taskObj);

                return {
                    ...oldTodoObj,
                    [source.droppableId] : sourceCopy,
                    [destination.droppableId] : destinationCopy
                }
            })
        }
        /* setTodosObj(oldTodos => {
            const copyToDos = [...oldTodos];
            copyToDos.splice(source.index, 1);
            copyToDos.splice(destination?.index, 0, draggableId);
            return copyToDos;
        }) */
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    {Object.keys(todosObj).map(boardId => <Board boardId={boardId} todos={todosObj[boardId]} />)}
                </Boards>
            </Wrapper>
        </DragDropContext>
    )
}

export default React.memo(Trello);