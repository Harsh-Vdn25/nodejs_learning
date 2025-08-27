import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';
function App() {
  const [Tasks, setTasks] = useState([]);
  const [userTask,setuserTask]=useState("");
  useEffect(() => {
    axios.get("http://localhost:5000/todos")
      .then(res => {
        setTasks(res.data);
        console.log(res.data);
        console.log(Array.isArray(res.data));
      })
      .catch(err => console.log(err));
  });

  const AddTodo=()=>{
    setuserTask("");
    if(!userTask.length>0){
      alert("Please enter a todo");
      return;
    }
    axios.post(`http://localhost:5000/todos`,{
      description:userTask
    }).then(res=>console.log("Added"))
    .catch(err=>console.log(err));
  }


  const deleteTask=(e)=>{
    const id=e.target.id;
    axios.delete(`http://localhost:5000/todos/${id}`)
    .then(res=>console.log("Deleted"))
    .catch(err=>console.log(err));
  }


  return (
    <>
      <div className='container'>
        <div className="tasks">
          <input type="text"
            placeholder="Enter your task here..."
            value={userTask} 
            onChange={(e)=>setuserTask(e.target.value)}
          ></input>
          <button className="submit-btn" onClick={()=>AddTodo()}>Add</button>
        </div>
        <div className='display'>
          {
            Tasks.length > 0 ? (
              Tasks.map(task => ( 
                <div className='individualtask' key={task.todo_id} >
                  <input type='checkbox' ></input>
                  <p>{task.description}</p>
                  <button className='delbtn' id={task.todo_id} onClick={(e)=>deleteTask(e)}>Delete</button>
                </div>
              )) 
            ) : (
              <p>No Tasks </p>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
