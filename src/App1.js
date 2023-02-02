import "./App.css";
import React, { useEffect, useState } from "react"; //버전17 이후에는 jsx 사용하더라도 별도로 사용안해줘도 됨
import axios from "axios";
import { baseUrl } from "./commonApi/todoApi";
import Input from "./components/input1";
import Todo from "./components/todo1";

//상태전달 : props
function App() {
  const wrap = {
    width: "500px",
    border: "1px solid black",
    margin: "10px auto",
  };

  //const baseUrl = "http://localhost:8090";

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const handleChangeText = (e) => {
    setInput(e.target.value);
  };

  //백엔드 데이터를 가져오기 위해선 axios가 필요하다. npm install axios
  //동기화 처리를 위해서 async를 넣어준다.
  async function getTodos() {
    //spring boot에 설정해 놓은 url 주소로 연결한 후, response.data를 통해 정보를 받아옴
    //동기화 처리부분이 필요한 부분에 await를 사용한다.
    await axios
      .get(baseUrl + "/todo/all")
      .then((response) => {
        //  console.log(response.data);
        console.log("11111111111111111111111");
        setTodos(response.data);
      })
      //에러가 발생하면 에러 값을 출력
      .catch((error) => {
        console.log(error);
      });

    console.log("ww33232323232323");
  }

  const insertTodo = async (e) => {
    e.preventDefault();
    await axios
      .post(baseUrl + "/todo", { todoname: input })
      .then((response) => {
        console.log(response.data);
        setInput("");
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("할일이 추가됨!");
  };

  const updateTodo = async (id, completed) => {
    await axios
      .put(baseUrl + "/todo/" + id + "/" + completed)
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: todo.completed == 1 ? 0 : 1 }
              : todo
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //넘겨받는 값 여러개이면 {return } 사용하기

  const deleteTodo = async (id) => {
    await axios
      .delete(baseUrl + "/todo/" + id)
      .then((response) => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("input:" + input);
  }, [input]);

  return (
    <div className="App" style={wrap}>
      <h1>TODO LIST1(props)</h1>
      <Input
        input={input}
        insertTodo={insertTodo}
        handleChangeText={handleChangeText}
      />
      <Todo todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
}
//updateTodo값에 파라미터값 있어서 onClick에서 바로 처리

export default App;
