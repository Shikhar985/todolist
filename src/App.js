import "./App.css";
import TextField from '@mui/material/TextField';
// import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import {db} from "./firebase_config";

import TodoListItem from './Todo';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function App() {
  //states
  const [todoInput, setTodoInput] = useState("");
  const [dateInput, setDateInput] = useState(null);
  const [todos, setTodos] = useState([]);

  function processDateTime(dt){
    var year = dt.substring(0,4)
    var month = dt.substring(5,7)
    var date = dt.substring(8,10)
    var time = dt.substring(11,dt.length)
    return date+"/"+month+"/"+year+" time : "+time;
  }

  //function to add element to firebase
  function addTodo(e) {
    if(todoInput==="") return;
    e.preventDefault();
    db.collection("todos").add({
      inprogress: true,
      timestamp: processDateTime(dateInput),
      todo: todoInput,
    });
    setTodoInput("");
  }

  // get todo items first time
  useEffect(() => {
      getTodos();
  }, []);

  //get old todos
  function getTodos() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
          timestamp: doc.data().timestamp,
        }))
      );
    });
  }

  return (
    <div className="App">
      <div className="Heading center">Todo list created by Animesh Shrivatri</div>
      <form className="Form extremCenter">
        <TextField
          id="standard-basic"
          label="Write a Todo"
          value = {todoInput}
          className = "Input"
          onChange={(e) => setTodoInput(e.target.value)}
        />

        <TextField
          style={{marginLeft:10}}
          id="datetime-local"
          label="Select Time"
          type="datetime-local"
          defaultValue="2022-06-18T10:30"
          sx={{ width: 250 }}
          InputLabelProps={{shrink: true,}}
          onChange={(e)=>setDateInput(e.target.value)}
        />
        
        <Button 
          style={{marginLeft:10}} 
          variant="outlined" 
          className="InputButton"
          onClick={addTodo}
        >Add</Button>
      </form>

      <div className="ListItems">
          {todos.map((todo) => (
            <TodoListItem
              todo={todo.todo}
              inprogress={todo.inprogress}
              id={todo.id}
              timestamp={todo.timestamp}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
