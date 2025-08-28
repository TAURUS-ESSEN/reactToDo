import {useOutletContext} from 'react-router-dom'
import styles from './tasks.module.css'
 

const colors = {
    1: 'low', 2: 'middle', 3: 'high'
}
export default function Tasks() {
    const {tasks, setTasks, categories, openModal, filters} = useOutletContext();
    
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

    function pretty(dueDate) {
        if (!dueDate) return 'без даты';
        const [y,m,d] = dueDate.split('-');
        return `${d}.${m}.${y}`;
    }

const filterByStatus = {
  all: () => true,
  active: (t) => !t.isReady,
  completed: (t) => t.isReady,
};
const statusPred = filterByStatus[filters?.status] ?? filterByStatus.all;

const categoryPred =
  !filters || filters.category === 'all'
    ? () => true
    : (t) => t.category === Number(filters.category);

const visible = tasks.filter(statusPred).filter(categoryPred);

    return (
        <>
        <ul> 
            {visible.map(task => { 
                const pClass = styles[colors[task.priority ?? 2]];
                return (
                <li key={task.id} className={`${task.isReady ? styles.strike : ''} ${pClass}` }>
                    <input type='checkbox' onChange={()=>makeComplete(task.id)} checked={task.isReady} />
                    {task.id} {task.name} {categories.find(category => category.id === task.category)?.name ?? 'No category'}
                    {pretty(task.dueDate)} {colors[task.priority]}
                    <button onClick={()=>openModal('editTask', task.id)}>Edit</button>
                    <button onClick={()=>deleteTask(task.id)}>Delete</button>
                </li>)
            })}
        </ul>
        </>
    )
}