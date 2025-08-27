import {Outlet} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import ModalHost from './components/Modal/ModalHost'
import './App.css'

const createId = () => Date.now() + Math.floor(Math.random() * 1000);

const DEFAULT_TASKS = [
  { id: createId(), name: 'task1', description: 'some text1' },
  { id: createId(), name: 'task2', description: 'some text2' },
  { id: createId(), name: 'task3', description: 'some text3' },
  { id: createId(), name: 'task4', description: 'some text4' },
]

function loadingInitialTasks() {
  try {
    const raw = localStorage.getItem('toDoTasks');
    if (!raw) return DEFAULT_TASKS
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : DEFAULT_TASKS
  }
  catch {
    return DEFAULT_TASKS
  }
}

function App() {
  const [tasks, setTasks] = useState(loadingInitialTasks)
  const [modal, setModal] = useState({isOpen: false, type: null, taskId:null})
  console.log(tasks)

  const openModal = (typeOfModule, id = null) => setModal({isOpen: true, type: typeOfModule, taskId : id});
  const closeModal = () => setModal({isOpen: false, type: null, taskId:null});
   console.log(modal)

  useEffect(() => {
    localStorage.setItem('toDoTasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      <div className='container'>
        <Sidebar setTasks={setTasks} openModal={openModal}/>
        <div className='main' >
          <Header />
          <Outlet context={{tasks, setTasks, openModal}}/>
          <Footer />
        </div>
      </div>
      <ModalHost modal={modal} closeModal={closeModal} tasks={tasks} setTasks={setTasks}/>
    </>
  )
}

export default App
