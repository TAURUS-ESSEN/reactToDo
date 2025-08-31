import {useOutletContext} from 'react-router-dom'
import styles from './tasks.module.css'

const colors = {
    1: 'low', 2: 'medium', 3: 'high'
}
export default function Tasks() {
    const {tasks, setTasks, categories, openModal, filters, setFilters} = useOutletContext();
    
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

// FILTER AREA
    function pretty(dueDate) {
        if (!dueDate) return '-';
        const [y,m,d] = dueDate.split('-');
        return `${d}.${m}.${y}`;
    }

    const filterByStatus = {
        all: () => true,
        active: (t) => !t.isReady,
        completed: (t) => t.isReady,
    };
    const statusPred = filterByStatus[filters?.status] ?? filterByStatus.all;


    const filterByPriority = {
        all: () => true,
        low: (t) => t.priority === 1,
        medium: (t) => t.priority === 2,
        high: (t) => t.priority === 3,
    };
    const priorityPred = filterByPriority[filters?.priority] ?? filterByStatus.all;


    const categoryPred = 
        !filters || filters.category === 'all'
        ? () => true
        : filters.category === 'nocategory'
            ?  (t) => t.category === 0
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
    week: (t) => {
        if (!t.dueDate) return false;                              // если у задачи нет даты → сразу не подходит
        const d = new Date(t.dueDate + 'T00:00:00');               // дата задачи в формате Date (ставим полночь)
        const now = new Date();                                    // текущая дата и время
        const day = (now.getDay() + 6) % 7;                        // номер дня недели (пн=0, вт=1, ..., вс=6)
        const monday = new Date(now);                              // копия сегодняшней даты
        monday.setDate(now.getDate() - day);                       // отнимаем "day", получаем понедельник этой недели
        monday.setHours(0,0,0,0);                                  // время = 00:00:00 (начало дня)
        const sunday = new Date(monday);                           // копия понедельника
        sunday.setDate(monday.getDate() + 6);                      // прибавляем 6 дней → воскресенье
        sunday.setHours(23,59,59,999);                             // время = 23:59:59.999 (конец дня)
        return d >= monday && d <= sunday;                         // проверяем: дата задачи внутри интервала недели?
    },

    overdue: (t) => !!t.dueDate && t.dueDate < todayLocalISO, // если у задачи есть дата (!!t.dueDate) и она меньше чем сегодня → просрочено
    none: (t) => !t.dueDate, // если у задачи даты нет вообще → подходит под фильтр "без даты"
    };
    const datePred = filterByDate[filters?.period] ?? filterByDate.all;

    const visible = tasks.filter(statusPred).filter(categoryPred).filter(datePred).filter(t=>t.name.includes(filters.search)).filter(priorityPred);

    return (
        <>
        <ul className={styles.tasksListe}> 
            <li className={styles.headerss}>
                <div className={`${styles.taskInfo} ${styles.headers}`}>
                    <span className={styles.taskName}>Task Name</span><span>Task Category</span><span>Due Date</span><span>Priority</span>
                </div>
            </li>
            {visible.map(task => { 
                const pClass = styles[colors[task.priority ?? 2]];
                return (
                <li key={task.id} className={`${task.isReady ? styles.strike : ''} ` }>
                    <div className={styles.taskInfo}>
                        <div className={pClass}>&nbsp;</div>
                        <input type='checkbox' onChange={()=>makeComplete(task.id)} checked={task.isReady} />
                        {/* <span>{task.id} </span> */}
                        <span className={styles.taskName}><button onClick={()=>openModal('editTask', task.id)} >{task.name}</button></span>
                        <span><button onClick={()=>setFilters(prev=>({...prev, category:  task.category}))}>
                            {categories.find(category => category.id === task.category)?.name ?? 'No category'}
                        </button></span>
                        <span>{pretty(task.dueDate)}</span>
                        <span>{colors[task.priority]}</span>
                    </div>
                    <div className={styles.taskButtons}>
                        <button onClick={()=>openModal('editTask', task.id)}>Edit</button>
                        <button onClick={()=>deleteTask(task.id)}>Delete</button>
                    </div>
                </li>)
            })}
        </ul>
        </>
    )
}