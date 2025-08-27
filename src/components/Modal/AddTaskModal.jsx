import styles from './modal.module.css'
import Modal from './Modal';
import {useState} from 'react';

export default function AppTaskModal({closeModal, setTasks}) {
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const canClick = taskName.trim().length > 0;
    const createId = () => Date.now() + Math.floor(Math.random() * 1000);

    function onSubmit(e) {
        e.preventDefault()
        if (!canClick) return
        setTasks(prev=>[...prev, {id: createId(), name: taskName.trim(), description: taskDescription.trim()}])
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