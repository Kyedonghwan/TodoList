import { useSetRecoilState } from "recoil";
import { Categories, categoryState } from "../atoms";

export default function Select () {

    const setCategory = useSetRecoilState(categoryState);

    const onInput = (e:React.FormEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value as any);
    }

    return (
        <select onInput={onInput}>
            <option value={Categories.TODO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
        </select>
    )
}