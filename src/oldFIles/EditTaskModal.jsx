import {useState} from 'react';
import { useAppContext } from '../../context/AppContext';
import Modal from './Modal';
import styles from './modal.module.css'
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

export default function EditTaskModal() {
    const {tasks, setTasks, modal, categories, setToasts, tags, closeModal} = useAppContext();
    const task = tasks.find(task=> task.id === modal.taskId);// это текущий таск который мы редактируем
    const [taskName, setTaskName] = useState(task.name); // это редактируемые поля
    const [taskDescription, setTaskDescription] = useState(task.description);
    const [taskCategory, setTaskCategory] = useState(task.categoryId);
    const [taskPriority, setTaskPriority] = useState(task.priority);
    const [dueDate, setDueDate] = useState(task.dueDate); 
    // const [taskTags, setTaskTags] = useState(task.tags); 
    
const [taskTags, setTaskTags] = useState(Array.isArray(task.tags) ? task.tags : []);


    const canClick = taskName.trim().length > 0; //защита от случайного нажатия

    function onSubmit(e) {
        e.preventDefault(); // не обновляется страница
        setTasks(prev =>
            prev.map(t =>
            t.id === modal.taskId ? { ...t, name: taskName, description: taskDescription, categoryId: Number(taskCategory), priority: Number(taskPriority), dueDate: dueDate ? format(dueDate, 'yyyy-MM-dd') : null, tags: taskTags  } : t
            )
        );
        const id = Date.now() + Math.random();
        setToasts(prev=>([...prev, {id, message: `${taskName} was succesfully changed`}]))
        closeModal()
    }

    
    function addTags(id) {
        //  e.preventDefault()
        !taskTags.includes(id) 
        ? setTaskTags(prev => [...prev, id])
        : setTaskTags(prev => prev.filter(tag=>tag!==id))
    
    }

    return (
        <>
        <Modal title={'Edit Task'} closeModal={closeModal}>
            <form onSubmit={onSubmit} className={styles.form}>
                <label>Task Name</label>
                <input type='text' 
                    onChange={(e)=>setTaskName(e.target.value)} 
                    value={taskName} 
                />
                <select onChange={(e)=>{setTaskCategory(e.target.value)}}>
                    <option disabled value='' selected required>Choose Category</option>
                    {categories.map(category => {
                        return <option key={category.id} value={category.id} selected={task.categoryId === category.id}>{category.name}</option>
                    })}
                </select>
                <label>Task Priority</label>
                <select onChange={(e)=>setTaskPriority(e.target.value)}>
                    <option value={1} selected={task.priority===1}>Low</option>
                    <option value={2} selected={task.priority===2}>Middle</option>
                    <option value={3} selected={task.priority===3}>High</option>
                </select>
                <label>Task Description</label>
                <textarea 
                    onChange={(e)=>setTaskDescription(e.target.value)} 
                    value={taskDescription}  
                    placeholder='some description'
                />
                    <DayPicker
                        className={styles.calendar}
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        weekStartsOn={1}
                    />
                    <div className="tagsDetails">
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
                <div>
                    <button type="button" onClick={closeModal}>Cancel</button>
                    <button type='submit' disabled={!canClick}>Send</button>
                </div>
            </form>
        </Modal>
        </>
    )
}