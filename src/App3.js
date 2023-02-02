import "./App.css";
import React, { useEffect, useState } from "react"; //버전17 이후에는 jsx 사용하더라도 별도로 사용안해줘도 됨
import axios from "axios";
import { baseUrl } from "./commonApi/todoApi";
import Input from "./components/input3";
import Todo from "./components/todo3";
import { Provider } from "react-redux";
import { store } from "./reduxs/store";

//상태전달 : Redux + useSelector() + useDispatch()
function App() {
  const wrap = {
    width: "500px",
    border: "1px solid black",
    margin: "10px auto",
  };

  //const baseUrl = "http://localhost:8090";

  const [todos, setTodos] = useState([]);

  async function getTodos() {
    await axios
      .get(baseUrl + "/todo/all")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App" style={wrap}>
      <h1>TODO LIST3(Redux)</h1>
      <Provider store={store}>
        <Input />
        <Todo />
      </Provider>
    </div>
  );
}
//updateTodo값에 파라미터값 있어서 onClick에서 바로 처리

export default App;
