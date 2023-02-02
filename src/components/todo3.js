import { useDispatch, useSelector } from "react-redux";
import Label from "./label3";

const Todo = () => {
  //store 안에 있는 값을 가져올 때 useSelector를 이용한다.
  const todos = useSelector((todos) => todos);
  const dispatch = useDispatch();

  const updateTodo = (id, completed) => {
    dispatch({ type: "UPDATE", id: id, completed: completed });
  };

  const deleteTodo = (id) => {
    dispatch({ type: "DELETE", id: id });
  };

  return (
    <>
      {todos
        ? //반복되서 정해진 값이 아닌 경우 props로 넘겨주는게 좋다
          todos.map((todo) => {
            return (
              <div className="todo" key={todo.id}>
                <Label
                  todo={todo}
                  //넘겨줄 값이 존재하면 콜백함수를 사용해야 한다.
                  updateTodo={() => updateTodo(todo.id)}
                  deleteTodo={() => deleteTodo(todo.id)}
                />
              </div>
            );
          })
        : null}
    </>
  );
};

export default Todo;
