import {useForm} from "react-hook-form";

interface IForm {
    email: string,
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    password1: string,
    extraError?: string
}

function ToDoList() {
    const { register, watch, handleSubmit, formState:{errors}, setError } = useForm<IForm>({defaultValues: {email:"@naver.com"}});

    const onValid = (data: IForm) => {
        if(data.password !== data.password1 ){
            setError("password1", {message: "Password are not the same"}, {shouldFocus: true});
        }
        // setError("extraError", {message: "server offline"});
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onValid)} style={{display: "flex", flexDirection: "column"}}>
                <input {...register("firstName", {required: true, minLength: 30})} placeholder="성" />
                <input {...register("lastName", {required: true, minLength: 30, validate: {
                    noNick: (current) => current.includes("nico")?"no nico": true ,
                    noDon: (current) => current.includes("dong")?"no dong": true 
                }
            })} placeholder="이름" />
                <span>{errors?.firstName?.message}</span>
                <input {...register("email", {required: true, pattern: {
                    value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
                    message: "Only naver.com emails allowed"
                }})} />
                <span>{errors?.email?.message}</span>
                <input {...register("password", {required: "password required!", minLength: 10})} />
                <span>{errors?.password?.message}</span>
                <input {...register("password1", {required: "password required!", minLength: 10})} />
                <span>{errors?.password1?.message}</span>
                <button>Add</button>
                <span>{errors?.extraError?.message}</span>
            </form>
        </div>
    )
}

export default ToDoList;