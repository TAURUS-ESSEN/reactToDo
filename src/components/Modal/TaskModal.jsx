import {useState} from 'react';
import { useAppContext } from '../../context/AppContext';
import Modal from './Modal';
import { DayPicker } from 'react-day-picker';
import styles from './modal.module.css'

import { format } from 'date-fns';

export default function TaskModal() {
    const {tasks, setTasks, modal, categories, setToasts, tags, closeModal} = useAppContext();
    const task = tasks.find(task=> task.id === modal.taskId);
    const [taskName, setTaskName] = useState(task ? task.name : ''); 
    const [taskDescription, setTaskDescription] = useState(task ?task.description : '');
    const [taskCategory, setTaskCategory] = useState(task ? task.categoryId : null);
    const [taskPriority, setTaskPriority] = useState(task ? task.priority : 2);
    const [dueDate, setDueDate] = useState(task? task.dueDate : null); 
    
    const [taskTags, setTaskTags] = useState(task ? Array.isArray(task.tags) ? task.tags : [] : []);
    const canClick = taskName.trim().length > 0;  

    function onSubmit(e) {
        e.preventDefault(); // не обновляется страница
        if (!canClick) return
        if (task) {
            setTasks(prev =>
                prev.map(t =>
                t.id === modal.taskId ? { ...t, name: taskName, description: taskDescription, categoryId: Number(taskCategory), priority: Number(taskPriority), dueDate: dueDate ? format(dueDate, 'yyyy-MM-dd') : null, tags: taskTags  } : t
                )
            );
            const id = Date.now() + Math.random();
            setToasts(prev=>([...prev, {id, message: `${taskName} was succesfully changed`}]))        
        }
        else {
            const createId = () => Date.now() + Math.floor(Math.random() * 1000);

            setTasks(prev=>[...prev, {id: createId(), name: taskName.trim(), description: taskDescription.trim(), completed: false, categoryId: taskCategory? Number(taskCategory) : 0 , priority: taskPriority, dueDate: dueDate ? format(dueDate, 'yyyy-MM-dd') : null, tags: taskTags }])
        const id = Date.now() + Math.random();
        setToasts(prev=>([...prev, {id, message: `${taskName} was added`}]))
        }
        closeModal()
    }

    
    function addTags(id) {
        !taskTags.includes(id) 
        ? setTaskTags(prev => [...prev, id])
        : setTaskTags(prev => prev.filter(tag=>tag!==id))
    }

    return (
        <>
        <Modal title={ task ? 'Edit Task' : 'Add Task'} closeModal={closeModal}>
            <form onSubmit={onSubmit} className={styles.form}>
                <div className={styles.formSubRow}>
                    <label>Task Name</label>
                    <input type='text' 
                        onChange={(e)=>setTaskName(e.target.value)} 
                        value={taskName} 
                        autoFocus
                    />
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formSubRow}>
                        <label>Task Category</label>
                        <select onChange={(e)=>{setTaskCategory(e.target.value)}}>
                            <option disabled value='' selected required>Choose Category</option>
                            {categories.map(category => {
                                return <option key={category.id} value={category.id} selected={task ? task.categoryId === category.id : ''}>{category.name}</option>
                            })}
                        </select>
                    </div>
                    <div className={styles.formSubRow}>
                        <label>Task Priority</label>
                        <select onChange={(e)=>setTaskPriority(e.target.value)} value={taskPriority}>
                            <option value={1} >Low</option>
                            <option value={2} >Middle</option>
                            <option value={3} >High</option>
                        </select>
                    </div>
                </div>
                <div className={styles.formSubRow}>
                    <label>Task Description</label>
                <textarea 
                    onChange={(e)=>setTaskDescription(e.target.value)} 
                    value={taskDescription}  
                    rows='5'
                    placeholder='some description'
                />
                <label>Task Date</label>
                <div className={styles.calendarDiv}>
                    <DayPicker
                        className={styles.calendar}
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        weekStartsOn={1}
                    />
                    </div>
                </div>
                <div className={styles.formSubRow}>
                    <div className={styles.formTagsDiv}>
                        <details open>
                            <summary>Task tags ({taskTags?.length } from 5)</summary>
                            {tags?.length > 0 && (
                                <div className="tagsBlock">
                                {tags.map(tag => {
                                    return <button 
                                    type="button"
                                            className={`tagBtn ${taskTags?.includes(tag.id) ? 'tagEnabled' : ''}`} 
                                            onClick={()=>addTags(tag.id)}
                                            key = {tag.id}
                                            disabled={!taskTags?.includes(tag.id) && taskTags?.length>=5}
                                            >#{tag.name}
                                        </button>
                                } )}
                                </div>
                            )
                            } 
                        </details>
                    </div>
                </div>
                <div className={styles.buttonsBlock}>
                    <button type="button" onClick={closeModal} className={styles.cancelBtn}>Cancel</button>
                    <button type='submit' disabled={!canClick} className={styles.addNewBtn}>Save</button>
                </div>
            </form>
        </Modal>
        </>
    )
}