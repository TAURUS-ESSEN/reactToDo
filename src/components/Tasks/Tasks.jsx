import {useOutletContext} from 'react-router-dom'
import styles from './tasks.module.css'

export default function Tasks() {
    const {tasks, setTasks, openModal} = useOutletContext();
    
    function deleteTask(id) {
        setTasks(prev=>prev.filter(task=>task.id!==id))
    }

    function makeComplete(id) {
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                return {...task, isReady: !task.isReady}
            } 
            return task
        }))
    }

    return (
        <>
        <ul>
            {tasks.map(task => {
                return (
                <li key={task.id} className={task.isReady ? styles.strike : ''}>
                    <input type='checkbox' onChange={()=>makeComplete(task.id)} checked={task.isReady} />
                    {task.id} {task.name} 
                    <button onClick={()=>openModal('editTask', task.id)}>Edit</button>
                    <button onClick={()=>deleteTask(task.id)}>Delete</button>
                </li>)
            })}
        </ul>
        </>
    )
}