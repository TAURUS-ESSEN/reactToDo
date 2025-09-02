import {Outlet} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import ModalHost from './components/Modal/ModalHost'
import './App.css'
 import 'react-day-picker/dist/style.css';

const createId = () => Date.now() + Math.floor(Math.random() * 1000);

const DEFAULT_CATEGORIES = [
  {id: 1, name: 'Category1'},
  {id: 2, name: 'Category2'},
  {id: 3, name: 'Category3'},
];

const DEFAULT_TASKS = [
  { id: createId(), name: 'task1', description: 'some text1', isReady: false, category: 1, priority: 1, dueDate: "2025-08-29"   },
  { id: createId(), name: 'task2', description: 'some text2', isReady: false, category: 1, priority: 2, dueDate: "2025-08-30"  },
  { id: createId(), name: 'task3', description: 'some text3', isReady: true, category: 2, priority: 1, dueDate: "2025-09-01"  },
  { id: createId(), name: 'task4', description: 'some text4', isReady: false, category: 3, priority: 3, dueDate: "2025-08-31"   },
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

function loadingInitialCategories() {
  try {
    const raw = localStorage.getItem('toDoCategories');
    if (!raw) return DEFAULT_CATEGORIES;
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : DEFAULT_CATEGORIES;
  }
  catch {
    return DEFAULT_CATEGORIES
  }
}

function App() {
  const [tasks, setTasks] = useState(loadingInitialTasks)
  const [categories, setCategories] = useState(loadingInitialCategories)
  const [modal, setModal] = useState({isOpen: false, type: null, taskId:null})
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    period: 'all',
    search: '',
    priority: 'all',
  })

  const openModal = (typeOfModule, id = null) => setModal({isOpen: true, type: typeOfModule, taskId : id});
  const closeModal = () => setModal({isOpen: false, type: null, taskId:null});


  useEffect(() => {
    localStorage.setItem('toDoTasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('toDoCategories', JSON.stringify(categories))
  }, [categories])

  return (
    <>
      <div className='container'>
        <Sidebar setTasks={setTasks} openModal={openModal} tasks={tasks} categories={categories}/>
        <div className='main' >
          <Header filters={filters} setFilters={setFilters} categories={categories}/>
          <Outlet context={{tasks, setTasks, categories, openModal, filters, setFilters}}/>
          <Footer />
        </div>
      </div>
      <ModalHost modal={modal} openModal={openModal} closeModal={closeModal} tasks={tasks} setTasks={setTasks} categories={categories} setCategories={setCategories}/>
    </>
  )
}

export default App
