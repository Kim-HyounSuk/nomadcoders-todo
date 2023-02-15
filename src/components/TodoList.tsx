import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { todoSelector } from "./atom";
import Category from "./Category";
import CreateCategory from "./CreateCategory";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

const Container = styled.div`
  max-width: 30rem;
  min-width: 410px;
  margin: 0px auto;
  padding: 0px 2rem;
`;
const Header = styled.header`
  display: flex;
  height: 8rem;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: ${(props) => props.theme.accentColor};
  }
`;

const TodoList = () => {
  const todos = useRecoilValue(todoSelector);

  return (
    <Container>
      <hr />
      <Header>
        <h1>Todo List</h1>
      </Header>
      <hr />
      <hr />
      <CreateCategory />
      <hr />
      <hr />
      <CreateTodo />
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </Container>
  );
};

export default TodoList;
