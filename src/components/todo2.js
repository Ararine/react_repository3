import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import Label from "./label2";

const Todo = () => {
  const { todos } = useContext(TodoContext);

  return (
    <>
      {todos
        ? //반복되서 정해진 값이 아닌 경우 props로 넘겨주는게 좋다
          todos.map((todo) => {
            return (
              <div className="todo" key={todo.id}>
                <Label todo={todo} />
              </div>
            );
          })
        : null}
    </>
  );
};

export default Todo;
