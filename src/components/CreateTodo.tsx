import { useRecoilValue, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { categoryState, todoState } from "./atom";
import Category from "./Category";
import styled from "styled-components";
import { BiAddToQueue } from "react-icons/bi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: rgb(10 10 10 / 10%) 0px 0.2rem 0.5rem;
  border-radius: 0.7rem;
  align-items: center;
  justify-content: center;
  span {
    color: red;
    font-size: 0.7rem;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    button {
      border: 2px solid ${(props) => props.theme.bgColor};
      border-radius: 7px;
      &:hover {
        color: ${(props) => props.theme.accentColor};
        border: 2px solid ${(props) => props.theme.accentColor};
        border-radius: 7px;
      }
    }
  }
`;

interface IFormData {
  todo: string;
}

const CreateTodo = () => {
  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  const handleValid = ({ todo }: IFormData) => {
    setTodos((todos) => [...todos, { text: todo, id: Date.now(), category }]);
    setValue("todo", "");
  };

  return (
    <>
      <Container>
        <CategoryWrapper>
          <Category />
          <form onSubmit={handleSubmit(handleValid)}>
            <input
              {...register("todo", {
                required: "You must enter something to do.",
              })}
              placeholder="Enter what to do."
            />
            <button>
              <BiAddToQueue />
            </button>
          </form>
        </CategoryWrapper>
        {errors.todo && <span>{errors.todo.message}</span>}
      </Container>
    </>
  );
};

export default CreateTodo;
