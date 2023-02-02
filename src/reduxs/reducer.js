//functoin reducer(state, action)

import axios from "axios";
import { baseUrl } from "../commonApi/todoApi";

async function todoGet() {
  await axios
    .get(baseUrl + "/todo/all")
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export const reducer = async (todos = todoGet(), action) => {
  switch (action.type) {
    case "INSERT": //추가
      return await axios.post(
        baseUrl + "/todo",
        { todoname: action.todoname }
          .then((response) => {
            console.log(response.date);
          })
          .catch((error) => {
            console.log(error);
          })
      );

    case "UPDATE": //수정
      return await axios
        .put(baseUrl + "/todo/" + action.id + "/" + action.completed)
        .then((response) => {
          todos.map((todo) =>
            todo.id == action.id
              ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
              : todo
          );
        })
        .catch((error) => {
          console.log(error);
        });

    case "DELETE": //삭제
      return await axios
        .delete(baseUrl + "/todo/" + action.id)
        .then((response) => {
          todos.filter((todo) => todo.id !== action.id);
        })
        .catch((error) => {
          console.log(error);
        });

    default: //목록
      return todos;
  }
};
