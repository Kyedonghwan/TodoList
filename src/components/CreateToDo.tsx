import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
    toDo: string
}

function CreateToDo() {

    const { register, handleSubmit, setValue } = useForm<IForm>();

    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);

    const onValid = (data: IForm) => {
        setToDos(oldToDos => [{text: data.toDo, category , id: Date.now()}, ...oldToDos]
        );
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