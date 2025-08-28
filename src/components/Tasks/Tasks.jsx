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

   
   const pad = (n) => String(n).padStart(2, '0');
const todayLocalISO = (() => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
})();
     
     // дата/период
const filterByDate = {
  all:   () => true,
  today: (t) => !!t.dueDate && t.dueDate === todayLocalISO,
  week:  (t) => {
    // простой вариант «эта неделя» (пн-вс) без библиотек:
    if (!t.dueDate) return false;
    const d = new Date(t.dueDate + 'T00:00:00'); // локально
    const now = new Date();
    const day = (now.getDay() + 6) % 7; // 0..6, где 0 = понедельник
    const monday = new Date(now); monday.setDate(now.getDate() - day);
    monday.setHours(0,0,0,0);
    const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6); sunday.setHours(23,59,59,999);
    return d >= monday && d <= sunday;
  },
  late:  (t) => !!t.dueDate && t.dueDate < todayLocalISO, // просрочено (строк сравнить достаточно для ISO 'YYYY-MM-DD')
  none:  (t) => !t.dueDate,
};
const datePred = filterByDate[filters?.period] ?? filterByDate.all;

const visible = tasks.filter(statusPred).filter(categoryPred).filter(datePred).filter(t=>t.name.includes(filters.search));

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