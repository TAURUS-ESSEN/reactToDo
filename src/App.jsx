import {Outlet} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import ModalHost from './components/Modal/ModalHost'
import Toast from './components/Toast/Toast'
import './App.css'
import 'react-day-picker/dist/style.css';
import './calendar.css'
import { DEFAULT_TASKS, DEFAULT_CATEGORIES, DEFAULT_TAGS } from './data/defaults';

function loadInitialTasks() {
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

function loadInitialCategories() {
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

function loadInitialTags() {
  try {
    const raw = localStorage.getItem('toDoTags');
    if (!raw) return DEFAULT_TAGS;
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : DEFAULT_TAGS;
  }
  catch {
    return DEFAULT_TAGS
  }
}

function App() {
  const [tasks, setTasks] = useState(loadInitialTasks)
  const [tags, setTags] = useState(loadInitialTags)
  const [categories, setCategories] = useState(loadInitialCategories)
  const [modal, setModal] = useState({isOpen: false, type: null, taskId:null})
  const [toasts, setToasts] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    period: 'all',
    search: '',
    priority: 'all',
    dueDate: 'all',
    tags: [],
    // maxTagsNumber: 5,
  })

  const openModal = (modalType, id = null) => setModal({isOpen: true, type: modalType, taskId : id});
  const closeModal = () => setModal({isOpen: false, type: null, taskId:null});

  useEffect(() => {
    localStorage.setItem('toDoTasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('toDoTags', JSON.stringify(tags))
  }, [tags])

  useEffect(() => {
    localStorage.setItem('toDoCategories', JSON.stringify(categories))
  }, [categories])

  return (
    <>
      <div className='wrapper'>
        <div className='container'>
          <Toast toasts = {toasts} setToasts={setToasts} />
          <Sidebar 
            setTasks={setTasks} 
            openModal={openModal} 
            tasks={tasks} 
            categories={categories}
            filters={filters} 
            setFilters={setFilters}
            setToasts={setToasts}
            tags={tags}
            setTags={setTags}
          />
          <main>
            <Header 
              tasks = {tasks}
              filters={filters} 
              setFilters={setFilters} 
              categories={categories} 
              openModal={openModal}
            />
            <Outlet context={{tasks, setTasks, categories, openModal, filters, setFilters, setToasts, tags}}/>
          </main>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>

      <ModalHost 
                modal={modal} 
                openModal={openModal} 
                closeModal={closeModal} 
                tasks={tasks} 
                setTasks={setTasks} 
                categories={categories} 
                setCategories={setCategories}
                setToasts={setToasts}
                tags={tags}
                setTags={setTags}
      />
    </>
  )
}

export default App
