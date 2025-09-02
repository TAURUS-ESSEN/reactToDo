import styles from './modal.module.css'
import Modal from './Modal';
import {useState} from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

export default function AppTaskModal({closeModal, setTasks, categories}) {
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [categoryId, setCategoryId] = useState(null)
    const [dueDate, setDueDate] = useState(null); 
    const [priority, setPriority] = useState(2);
    console.log('categoryId', categoryId)

    const canClick = taskName.trim().length > 0;
    const createId = () => Date.now() + Math.floor(Math.random() * 1000);

    function onSubmit(e) {
        e.preventDefault()
        if (!canClick) return
        setTasks(prev=>[...prev, {id: createId(), name: taskName.trim(), description: taskDescription.trim(), isReady: false, category: categoryId ? Number(categoryId) : 0 , priority: priority, dueDate: dueDate ? format(dueDate, 'yyyy-MM-dd') : null }])
        setTaskName('');
        setTaskDescription('');
        closeModal();
    }

    return (
        <>
        <Modal title={'Add Task'} closeModal={closeModal}>
            <form onSubmit={onSubmit} className={styles.form}>
                <label>Task Name</label>
                <input type='text' 
                    onChange={(e)=>setTaskName(e.target.value)} 
                    value={taskName} 
                />
                <select onChange={(e)=>{setCategoryId(e.target.value)}}>
                    <option disabled value='' selected required>Choose Category</option>
                    {categories.map(category => {
                        return <option key={category.id} value={category.id}>{category.name}</option>
                    })}
                </select>{categoryId}
                <label>Task Description</label>
                <textarea 
                    onChange={(e)=>setTaskDescription(e.target.value)} 
                    value={taskDescription}  
                    placeholder='some description'
                />
                <label>Priority</label>
                <select onChange={(e)=>setPriority(e.target.value)}>
                    <option value={1}>Low</option>
                    <option value={2} selected>Middle</option>
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
                <div>
                    <button type="button" onClick={closeModal}>Cancel</button>
                    <button type='submit' disabled={!canClick}>Send</button>
                </div>
            </form>
        </Modal>
        </>
    )
}