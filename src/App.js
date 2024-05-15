import {useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [input,setInput] = useState('')
    const [tasks, setTask] = useState([])
    
    useEffect(()=>{getTask()},[])
    
    async function createTask(){
        const data = {
            task:input,
            done:false
        }
        console.log(data)
        await axios.post('http://192.168.1.12:3001/tasks/', data)
        .then(
          response =>{
            console.log('Hello World')
            console.log(response)
          }  
        ).catch(
            error =>{
                console.log(error)
            }
        )   
    }

    async function getTask(){
        await axios.get('http://192.168.1.12:3001/tasks')
        .then(
            response =>{
              console.log(response)
            }  
          ).catch(
              error =>{
                  console.log(error)
              }
          )   
    }

    // async function deleteTask(taskData){
    //     await axios.delete(`http://192.168.1.12:3001/tasks/${taskData._id}`)
    //     .then(
    //         response =>{
    //           console.log(response)
    //         }  
    //       ).catch(
    //           error =>{
    //               console.log(error)
    //           }
    //       )  
    // }

    // async function updateTask(taskData){
    //     const data = {
    //         done:taskData.done
    //     }
    //     await axios.put(`http://192.168.0.100:3001/tasks/${taskData._id, data}`)
    //     .catch(
    //         error =>{
    //             console.log(error)
    //         })
    // }
    function deleted(index){
        const updatedTasks = tasks.filter((task, idx) => idx !== index);
        setTask(updatedTasks)
    }
    

    function addTask(){
        if (input.trim()!==''){
            const newTask ={
                task:input,
                done:false
            }
            setTask([...tasks,newTask])
            setInput('')
            createTask()
        }
    }

    function done(index){
        const updateTasks = tasks.map((task, idx) => {
            if (idx === index) {
                const updateTask = { ...task, done: !task.done};
                return updateTask;
            }
            return task;
        });
        const sortedTasks = updateTasks.sort((a, b) => {
            return a.done === b.done ? 0 : a.done ? 1 : -1;
        });
        setTask(sortedTasks)
    }

    return (
        <div className="container">
            <h1>Lista de Tarefas</h1>
            <div className="add-task">
                <input type="text" value={input} placeholder="Adicionar tarefa" onChange={(e)=>setInput(e.target.value)}/>
                <button className="add" onClick = {addTask}>Adicionar Tarefa</button>
            </div>
            <div className="task-list">
                {tasks.map((task,index)=>(
                    <div key={index}>
                        <input 
                        type='checkbox'
                        checked={task.done}
                        onChange={()=>done(index)}
                        style = {{ cursor: 'pointer', marginRight: '10px'}}
                        />
                        <span>{task.task}</span>
                        <button onClick={()=>deleted(index)}></button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
