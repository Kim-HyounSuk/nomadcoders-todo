import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categorySelector, ITodoData, todoState } from "./atom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { BiEdit, BiTrash, BiWindowClose } from "react-icons/bi";

const TodoWrapper = styled.div`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: rgb(10 10 10 / 10%) 0px 0.2rem 0.5rem;
  border-radius: 0.7rem;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      display: flex;
    }
    span:first-child {
      color: ${(props) => props.theme.textColor};
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    span {
      color: red;
      font-size: 0.7rem;
    }
    button {
      border: 2px solid ${(props) => props.theme.bgColor};
      border-radius: 7px;
      &:hover {
        color: ${(props) => props.theme.accentColor};
        border: 2px solid ${(props) => props.theme.accentColor};
        border-radius: 7px;
      }
    }
    button:nth-child(3):hover {
      color: red;
      border: 2px solid red;
    }
  }
`;

interface IFormData {
  updateTodo: string;
}

const Todo = ({ text, id, category }: ITodoData) => {
  const [updateToggle, setUpdateToggle] = useState(false);
  const setTodos = useSetRecoilState(todoState);
  const categories = useRecoilValue(categorySelector);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  const handleValid = ({ updateTodo }: IFormData) => {
    setTodos((todos) => {
      const targetIdx = todos.findIndex((todo) => todo.id === id);
      const todo = { text: updateTodo, id, category };
      return [
        ...todos.slice(0, targetIdx),
        todo,
        ...todos.slice(targetIdx + 1),
      ];
    });
    setValue("updateTodo", "");
    setUpdateToggle(!updateToggle);
  };
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setTodos((todos) => {
      const targetIdx = todos.findIndex((todo) => todo.id === id);
      const todo = { text, id, category: value };
      return [
        ...todos.slice(0, targetIdx),
        todo,
        ...todos.slice(targetIdx + 1),
      ];
    });
  };
  const onRemove = () => {
    setTodos((todos) => {
      return todos.filter((todo) => todo.id !== id);
    });
  };
  const onUpdate = () => {
    setUpdateToggle(!updateToggle);
  };

  return (
    <TodoWrapper>
      {updateToggle ? (
        <li>
          <form onSubmit={handleSubmit(handleValid)}>
            <input
              {...register("updateTodo", {
                required: "You must enter the Todo to change.",
              })}
              placeholder="Enter the edit Todo."
            />
            <button>
              <BiEdit />
            </button>
            <button onClick={onUpdate}>
              <BiWindowClose />
            </button>
          </form>
          {errors.updateTodo && <span>{errors.updateTodo.message}</span>}
        </li>
      ) : (
        <li>
          <span>{text}</span>
          <div>
            <select defaultValue={category} onInput={onInput}>
              <option value={category} disabled hidden>
                Category Change
              </option>
              {categories.map((value, idx) => (
                <option key={idx} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <button onClick={onUpdate}>
              <BiEdit />
            </button>
            <button onClick={onRemove}>
              <BiTrash />
            </button>
          </div>
        </li>
      )}
    </TodoWrapper>
  );
};

export default Todo;
