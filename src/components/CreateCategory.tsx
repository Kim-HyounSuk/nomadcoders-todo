import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState } from "./atom";
import { useForm } from "react-hook-form";
import { BiAddToQueue, BiWindowClose } from "react-icons/bi";

const Button = styled.button<{ isActive: boolean }>`
  display: flex;
  background-color: white;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  padding: 1rem;
  border: ${(props) =>
    props.isActive ? `2px solid ${props.theme.accentColor}` : "none"};
  align-items: center;
  justify-content: center;
  border-radius: 0.7rem;
  margin-bottom: ${(props) => (props.isActive ? "0.5rem" : "1rem")};
  cursor: pointer;
  &:hover {
    color: ${(props) => (props.isActive ? "red" : props.theme.accentColor)};
    border: 2px solid
      ${(props) => (props.isActive ? "red" : props.theme.accentColor)};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  form {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: rgb(10 10 10 / 10%) 0px 0.2rem 0.5rem;
    border-radius: 0.7rem;
    align-items: center;
    justify-content: center;
    button {
      border: 2px solid ${(props) => props.theme.bgColor};
      border-radius: 7px;
      &:hover {
        color: ${(props) => props.theme.accentColor};
        border: 2px solid ${(props) => props.theme.accentColor};
        border-radius: 7px;
      }
    }
    span {
      color: red;
      font-size: 0.7rem;
    }
  }
`;

interface IFormData {
  category: string;
}

const CreateCategory = () => {
  const [btnState, setBtnState] = useState(false);
  const setCategories = useSetRecoilState(categoriesState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  const onClick = () => setBtnState(!btnState);
  const handleValid = ({ category }: IFormData) => {
    setCategories((categories) => {
      if (categories.indexOf(category) === -1) {
        return [...categories, category];
      } else {
        return [...categories];
      }
    });
    setValue("category", "");
    setBtnState(!btnState);
  };

  return (
    <Container>
      {!btnState ? (
        <Button isActive={btnState} onClick={onClick}>
          Add Category
          <BiAddToQueue />
        </Button>
      ) : (
        <Button isActive={btnState} onClick={onClick}>
          Close Adding Category
          <BiWindowClose />
        </Button>
      )}
      {btnState && (
        <form onSubmit={handleSubmit(handleValid)}>
          <div>
            <input
              {...register("category", {
                required: "Category name must be entered.",
              })}
              placeholder="Category' name"
            />
            <button>
              <BiAddToQueue />
            </button>
          </div>
          {errors.category && <span>{errors.category.message}</span>}
        </form>
      )}
    </Container>
  );
};

export default CreateCategory;
