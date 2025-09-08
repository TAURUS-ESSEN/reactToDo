import styles from './modal.module.css'
import Modal from './Modal';
import {useState} from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

export default function AddTaskModal({closeModal, setTasks, categories, setToasts, tags}) {
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [categoryId, setCategoryId] = useState(null)
    const [dueDate, setDueDate] = useState(null); 
    const [priority, setPriority] = useState(2);
    const [taskTags, setTaskTags] = useState([])
    console.log('categoryId', categoryId)

    const canClick = taskName.trim().length > 0;
    const createId = () => Date.now() + Math.floor(Math.random() * 1000);

    function onSubmit(e) {
        e.preventDefault()
        if (!canClick) return
        setTasks(prev=>[...prev, {id: createId(), name: taskName.trim(), description: taskDescription.trim(), completed: false, categoryId: categoryId ? Number(categoryId) : 0 , priority: priority, dueDate: dueDate ? format(dueDate, 'yyyy-MM-dd') : null, tags: taskTags }])
        const id = Date.now() + Math.random();
        setToasts(prev=>([...prev, {id, message: `${taskName} was added`}]))
        setTaskName('');
        setTaskDescription('');
        closeModal();
    }

    function addTags(id) {
        //  e.preventDefault()
        !taskTags.includes(id) 
        ? setTaskTags(prev => [...prev, id])
        : setTaskTags(prev => prev.filter(tag=>tag!==id))
    
    }

    return (
        <> 
        <Modal title={'Add Task'} closeModal={closeModal}>
            <form onSubmit={onSubmit} className={styles.form}>
                <label>Task Name</label>
                <input type='text' 
                    onChange={(e)=>setTaskName(e.target.value)} 
                    value={taskName} 
                    autoFocus
                />
                <select onChange={(e)=>{setCategoryId(e.target.value)}}>
                    <option disabled value='' selected required>Choose Category</option>
                    {categories.map(category => {
                        return <option key={category.id} value={category.id}>{category.name}</option>
                    })}
                </select>
                <label>Task Description</label>
                <textarea 
                    onChange={(e)=>setTaskDescription(e.target.value)} 
                    value={taskDescription}  
                    placeholder='some description'
                />
                <label>Priority</label>
                <select onChange={(e)=>setPriority(e.target.value)}>
                    <option value={1} selected>Low</option>
                    <option value={2}>Middle</option>
                    <option value={3}>High</option>
                </select>
                <label>Due date</label>
                <DayPicker
                    className={styles.calendar}
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    weekStartsOn={1}
                />
                <div className="tagsDetails">
                    <details open>
                        <summary>Task tags ({taskTags.length } from 5)</summary>
                        {tags.length > 0 && (
                            <div className="tagsBlock">
                            {tags.map(tag => {
                                return <button 
                                type="button"
                                        className={`tagBtn ${taskTags.includes(tag.id) ? 'tagEnabled' : ''}`} 
                                        onClick={(e)=>addTags(tag.id)}
                                        key = {tag.id}
                                        disabled={!taskTags.includes(tag.id) && taskTags.length>=5}
                                        >#{tag.name}
                                    </button>
                            } )}
                            </div>
                        )
                        } 
                    </details>
                </div>
                                <div>
                    <button type="button" onClick={closeModal}>Cancel</button>
                    <button type='submit' disabled={!canClick}>Send</button>
                </div>
            </form>
        </Modal>
        </>
    )
}