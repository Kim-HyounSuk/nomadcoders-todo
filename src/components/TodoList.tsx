import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IFormData {
  todo: string;
}

interface ITodoData {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const todoState = atom<ITodoData[]>({
  key: "todo",
  default: [],
});

const TodoList = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const { register, handleSubmit, setValue } = useForm<IFormData>();

  const handleValid = ({ todo }: IFormData) => {
    setTodos((todos) => [
      ...todos,
      { text: todo, id: Date.now(), category: "TO_DO" },
    ]);
    setValue("todo", "");
  };

  return (
    <div>
      <h1>Todo List</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("todo", {
            required: "Please write a what to do.",
          })}
          placeholder="Please write what to do in here."
        />
        <button>Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
