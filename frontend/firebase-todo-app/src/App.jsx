import axios from "axios";
import { Trash } from "lucide-react";
import { SquareCheckBig } from "lucide-react";
import { Square } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form"

function App() {
  const {register,handleSubmit,reset,formState:{errors}} = useForm();
  const [loading,setLoading] = useState(false);
  const [todos,setTodos] = useState([])
  const fetchTodos = async () =>{
        let newTodos = []
        try {
          const {data} = await axios.get(`${import.meta.env.VITE_FIREBASE_URI}/todos.json`)          
          for(let key in data){
            let id = key;
            let todo = data[key].todo;
            let completed = data[key].completed
            let dueDate = data[key].dueDate
            newTodos.push({
              id,todo,completed,dueDate
            })
          } 
          setTodos(newTodos)
          
        } catch (error) {
          console.log(error);
        }
      }
  
  
  
  useEffect(()=>{
      fetchTodos()
  },[])


  const submitHandler = async (data) =>{
      setLoading(true)   
      try {
        await axios.post(`${import.meta.env.VITE_FIREBASE_URI}/todos.json`,{
          ...data,
          completed:false
        })  
        fetchTodos()
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
        reset()
      }
  }

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_FIREBASE_URI}/todos/${id}.json`)
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  }

  const updateCompletedStatus = async (id,currentStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_FIREBASE_URI}/todos/${id}.json`,{completed:!currentStatus})
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='max-w-125 mx-auto'>
      <h1 className="text-2xl font-bold mt-10">
         Schedule your day
      </h1>
      <p className="text-sm text-neutral-400 mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, voluptas!
      </p>

      <form onSubmit={handleSubmit(submitHandler)} className="">
          <div className="flex gap-2 mt-8">
            <input {...register("todo", {required:true})} type="text" placeholder="Enter task" className="grow p-2 px-3 text-sm outline-0 border rounded"/>
            <input  {...register("dueDate", {required:true})} type="date" className="w-10 p-2 text-transparent outline-0 border rounded"/>
          </div>
          <input type="submit" className="cursor-pointer w-full py-3 px-3 bg-black text-white mt-2 rounded" value={loading?"Creating...":"Create todo"}/>
          {errors.todo && <div className="text-xs text-red-600 mt-1">Todo is required</div>}
          {errors.dueDate && <div className="text-xs text-red-600 mt-1">Due Date is required</div>}
      </form>

      <div className="flex flex-col gap-2 mt-10">
            {
              todos.map((todo)=>(
                  <div key={todo.id} className={`py-6 px-4 border rounded flex justify-between items-center gap-4 ${todo.completed ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"} `}>
                          {todo.completed ? <SquareCheckBig onClick={()=>updateCompletedStatus(todo.id,todo.completed)} className={`h-6 w-6 shrink-0 mt-1 text-green-700 hover:text-amber-500`}/> :<Square onClick={()=>updateCompletedStatus(todo.id,todo.completed)} className={`h-6 w-6 shrink-0 mt-1 text-amber-700 hover:text-green-500`}/>}
                          <div className="text-sm grow">
                              <p className="font-semibold">
                                  {todo.todo}
                              </p>
                              <p className="opacity-60 text-xs">
                                {todo.dueDate}
                              </p>
                          </div>
                          <Trash onClick={()=>deleteHandler(todo.id)} className="h-6 w-6 shrink-0 mt-1 text-neutral-700 hover:text-red-500"/>
                  </div>
              ))
            }
      </div>

    </div>
  )
}

export default App
