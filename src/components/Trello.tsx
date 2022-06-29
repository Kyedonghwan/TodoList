import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { trelloTodoState } from "../atoms";
import Board from "./Board";
import CreateNewBoard from "./CreateNewBoard";
import TrashDelete from "./TrashDelete";

const Wrapper = styled.div`
    display: flex;
    max-width: 470px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
    max-width: 680px;
    flex-direction: column;
`

const Boards = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
`

const Trello = () => {

    const [todosObj, setTodosObj] = useRecoilState(trelloTodoState);
    const [isDraggingEnd, setIsDraggingEnd] = useState(false);

    useEffect(()=>{
        localStorage.setItem("todosObj", JSON.stringify(todosObj))
    }, [todosObj]);

    

    const onDragEnd = (info: DropResult) => {
        const {destination, draggableId, source } = info;
        console.log(source,destination,draggableId);
        if(!destination) return;

        if(destination?.droppableId === source.droppableId ) {
            setTodosObj(oldTodosObj => {
                if(destination.droppableId==="main"){

                    const sourceCopy = Object.entries(oldTodosObj);
                    const [temp] = sourceCopy.splice(source.index,1);
                    sourceCopy.splice(destination.index, 0, temp);

                    return sourceCopy.reduce((r, [k,v]) => ({
                        ...r, [k]: v
                    }), {});
                }

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

                if(destination.droppableId=="delete"){
                    const sourceCopy = [...oldTodoObj[source.droppableId]];
                    sourceCopy.splice(source.index,1);

                    setIsDraggingEnd(true);
                    setTimeout(()=> setIsDraggingEnd(false),2000);

                    return {
                        ...oldTodoObj,
                        [source.droppableId] : sourceCopy
                    }
                }

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
                <CreateNewBoard/>
                <Droppable droppableId="main" direction="horizontal" type="BOARD">
                {(magic) => 
                    (
                        <Boards ref={magic.innerRef} {...magic.droppableProps}>
                        {Object.keys(todosObj).map((boardId, index) => <Board key={boardId} index={index} boardId={boardId} todos={todosObj[boardId]} />)}
                        {magic.placeholder}
                        </Boards>
                    )
                }
                </Droppable>
                <TrashDelete isDraggingEnd={isDraggingEnd}/>
            </Wrapper>
        </DragDropContext>
    )
}

export default React.memo(Trello);