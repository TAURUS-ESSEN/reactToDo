import {useOutletContext} from 'react-router-dom'

export default function Tasks() {
    const {tasks, openModal} = useOutletContext();
    return (
        <>
        <ul>
            {tasks.map(task => {
                return <li key={task.name}>{task.name}<button onClick={()=>openModal('editTask')}>Edit</button></li>
            })}
        </ul>
        </>
    )
}