import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLocalStorage()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleDelete = (e, id) => {
    confirm("Are you sure?")
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLocalStorage()
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-6 bg-teal-100 px-4 py-3 rounded-xl min-h-[80vh] xl:w-1/2 w-full">
        <h1 className='font-bold text-2xl text-center'>iTask - Manage your todos at one place</h1>
        <div className="addTodo mt-5 mb-3 flex flex-col gap-3">
          <h2 className='font-bold text-lg'>Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='outline-0 w-full rounded-lg py-1 px-4' placeholder='Enter your Task' />
            <button onClick={handleAdd} disabled={todo.length < 3} className='bg-teal-900 hover:bg-teal-950 disabled:bg-teal-600 text-white px-3 py-1 rounded-md font-bold text-sm mx-3 cursor-pointer'>Save</button>
          </div>
        </div>

        <input onClick={toggleFinished} type="checkbox" checked={showFinished} className='my-4' /> Show Finished

        <h2 className='font-bold text-lg'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No todos to display</div>}
          {todos.map(item => {

            return (!showFinished || item.isCompleted) && (
              <div key={item.id} className="todo flex w-full justify-between my-3">
                <div className='flex gap-5'>
                  <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-teal-900 hover:bg-teal-950 text-white px-3 py-1 rounded-md font-bold text-sm mx-5'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-teal-900 hover:bg-teal-950 text-white px-3 py-1 rounded-md font-bold text-sm mx-1'><MdDelete /></button>
                </div>
              </div>)
          })}
        </div>
      </div>
    </>
  )
}

export default App
