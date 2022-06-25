import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
    toDo: string
}

function CreateToDo() {

    const { register, handleSubmit, setValue } = useForm<IForm>();

    const setToDos = useSetRecoilState(toDoState);
    const onValid = (data: IForm) => {
        setToDos(oldToDos => [{text: data.toDo, category:"TODO", id: Date.now()}, ...oldToDos]);
        setValue("toDo","");
    }

    return (
        <form onSubmit={handleSubmit(onValid)} >
            <input type="text" {...register("toDo", {
                required: "required"
            })} placeholder="what a to do" />
        </form>
    )

}

export default CreateToDo;