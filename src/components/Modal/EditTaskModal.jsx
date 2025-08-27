import {useState} from 'react';
import Modal from './Modal';
import styles from './modal.module.css'

export default function EditTaskModal({tasks, setTasks, modal, closeModal}) {
    const task = tasks.find(task=> task.id === modal.taskId);// это текущий таск который мы редактируем
    const [taskName, setTaskName] = useState(task.name); // это редактируемые поля
    const [taskDescription, setTaskDescription] = useState(task.description);
    const canClick = taskName.trim().length > 0; //защита от случайного нажатия

    function onSubmit(e) {
        e.preventDefault(); // не обновляется страница
        setTasks(prev =>
            prev.map(t =>
            t.id === modal.taskId ? { ...t, name: taskName, description: taskDescription } : t
            )
        );
        closeModal()
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
                <label>Task Description</label>
                <textarea 
                    onChange={(e)=>setTaskDescription(e.target.value)} 
                    value={taskDescription}  
                    placeholder='some description'
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