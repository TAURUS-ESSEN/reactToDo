import {Outlet} from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import ModalHost from './components/Modal/ModalHost'
import Toast from './components/Toast/Toast'
import './App.css'
import 'react-day-picker/dist/style.css';
import './calendar.css'
import { DEFAULT_TASKS, DEFAULT_CATEGORIES, DEFAULT_TAGS } from './data/defaults';

function loadInitialData(storageKey, defaultValue) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return defaultValue;
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : defaultValue;
  }
  catch {
    return defaultValue
  }
} 

function App() {
  const [tasks, setTasks] = useState(()=>loadInitialData('toDoTasks', DEFAULT_TASKS))
  const [tags, setTags] = useState(()=>loadInitialData('toDoTags', DEFAULT_TAGS))
  const [categories, setCategories] = useState(()=>loadInitialData('toDoCategories', DEFAULT_CATEGORIES))
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
  })

  const openModal = useCallback((modalType, id = null) => {
    setModal({isOpen: true, type: modalType, taskId : id});
  }, []);
  const closeModal = useCallback(() => {
    setModal({isOpen: false, type: null, taskId:null});
  }, []);


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
