import { useForm } from "react-hook-form"
import { useSetRecoilState } from "recoil";
import styled from "styled-components"
import { trelloTodoState } from "../atoms";

interface IForm {
    board: string;    
}

const Create = styled.div`
    width: 30%;

    input {
        padding: 5px;
        border-radius: 5px;
        border: 0;
        margin-bottom: 20px;
        width: 100%;
    }
`;

export default function CreateNewBoard () {
    
    const setTodosObj = useSetRecoilState(trelloTodoState);

    const {register, setValue, handleSubmit} = useForm<IForm>();

    const onValid = ( {board}:IForm ) => {

        setTodosObj(oldTodoObj => (
            {...oldTodoObj, [board]:[]}
        ));

        setValue("board", "");
    }

    return (
        <Create>
            <form onSubmit={handleSubmit(onValid)}>
                <input type="text" {...register("board", {required : true})} placeholder="Please write new board name!"/>
            </form>
        </Create>
    )
}