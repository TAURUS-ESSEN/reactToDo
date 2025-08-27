import {useOutletContext} from 'react-router-dom'

export default function Tasks() {
    const {tasks, setTasks, openModal} = useOutletContext();
    function deleteTask(id) {
        setTasks(prev=>prev.filter(task=>task.id!==id))
    }

    return (
        <>
        <ul>
            {tasks.map(task => {
                return (
                <li key={task.id}>
                    {task.id} {task.name} 
                    <button onClick={()=>openModal('editTask', task.id)}>Edit</button>
                    <button onClick={()=>deleteTask(task.id)}>Delete</button>
                </li>)
            })}
        </ul>
        </>
    )
}