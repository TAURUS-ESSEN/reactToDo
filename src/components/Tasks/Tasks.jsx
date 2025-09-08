import { useOutletContext } from 'react-router-dom'
import { useState } from 'react';
import Chips from './Chips'
import Tags from '../Tags/Tags.jsx'
import styles from './tasks.module.css'
import TasksTableHeader from './TasksTableHeader';

const colors = {
    1: 'low', 2: 'medium', 3: 'high'
}

export default function Tasks() {
    const {tasks, setTasks, categories, openModal, filters, setFilters, setToasts, tags} = useOutletContext();
    const [sortTasks, setSortTasks] = useState({ by: '', dir: ''})
    
    function deleteTask(id) {
        const deletedTask = tasks.find(task=>task.id === id);
        setTasks(prev=>prev.filter(task=>task.id!==id))
        let currentTask = tasks.find(task=>task.id === id)
        const toastId = Date.now() + Math.random();
        setToasts(prev=>([...prev, {toastId, message: (
            <>
                Task <strong>{currentTask.name}</strong> was deleted <button className='undoBtn' onClick={(e)=>{
                    e.currentTarget.disabled = true;
                    undo(deletedTask, toastId)
                    
                    }}>Undo ↻</button>
            </>
            ) 
        }]))
    }

    function makeCompleted(id) {
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                return {...task, completed: !task.completed}
            } 
            return task
        }))
    }

function undo(deletedTask, toastId) {
  setToasts(prev => prev.filter(t => t.toastId !== toastId));  
  setTasks(prev => [...prev, deletedTask]);
}


// FILTER AREA
    function pretty(dueDate) {
        if (!dueDate) return '-';
        const [y,m,d] = dueDate.split('-');
        return `${d}.${m}.${y}`;
    }

    const filterByStatus = {
        all: () => true,
        active: (t) => !t.completed,
        completed: (t) => t.completed,
    };
    const statusPred = filterByStatus[filters?.status] ?? filterByStatus.all;

    const filterByPriority = {
        all: () => true,
        low: (t) => t.priority === 1,
        medium: (t) => t.priority === 2,
        high: (t) => t.priority === 3,
    };
    const priorityPred = filterByPriority[filters?.priority] ?? filterByStatus.all;

    const dueDatePred =  
            !filters || filters.dueDate === 'all'
            ? () => true
            : (t) => t.dueDate === filters.dueDate;

const selectedTagIds = (filters?.tags ?? []).map(Number);

const tagsPred =
//   selectedTagIds.length === 0
//     ? () => true
//     : (t) =>
//         Array.isArray(t.tags) &&
//         t.tags.some((id) => selectedTagIds.includes(Number(id)));

selectedTagIds.length === 0
    ? () => true
    : (t) =>
        Array.isArray(t.tags) &&
        selectedTagIds.every((id) => t.tags.includes(Number(id)));

    const categoryPred = 
        !filters || filters.category === 'all'
        ? () => true
        : filters.category === 'nocategory'
            ?  (t) => t.categoryId === 0
            : (t) => t.categoryId === Number(filters.category);

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
    
    const visible = tasks.filter(statusPred).filter(categoryPred).filter(datePred).filter(t=>t.name.includes(filters.search)).filter(priorityPred).filter(dueDatePred).filter(tagsPred);

    // SORTING AREA

    function sortBy(value) {
        let dirValue = '';
        value === sortTasks.by 
            ? dirValue = sortTasks.dir === 'asc' ?  'desc' : 'asc'
            : dirValue = 'asc';
        setSortTasks({by: value, dir: dirValue})
    }

    const sortedVisible = (() => {
    const arr = [...visible]; // ВАЖНО: копия
    if (sortTasks.by === 'name') {
        arr.sort((a, b) =>
            sortTasks.dir === 'asc'
            ? a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
            : b.name.localeCompare(a.name, undefined, { sensitivity: 'base' })
        );
    }
    if (sortTasks.by === 'priority') {
        arr.sort((a, b) =>
            sortTasks.dir === 'asc'
            ? b.priority-a.priority
            : a.priority-b.priority
        );
    }

    if ((sortTasks.by === 'dueDate') || (sortTasks.by === '') ) {
        arr.sort((a, b) => {
            const A = a.dueDate ?? ''; // '' если нет даты
            const B = b.dueDate ?? '';
            if (!A && !B) return 0;
            if (!A) return 1;      // пустые всегда вниз
            if (!B) return -1;

            const res = A.localeCompare(B); // ISO 'YYYY-MM-DD' сортируется корректно
            return sortTasks.dir === 'desc' ? -res : res;
        });
    }
  // тут же можно добавить сортировки по дате/приоритету аналогично
 
    return arr;
 
    })();

    function checkAllTasks(e) {
            const checked = e.target.checked;
            setTasks(prev => prev.map(t => visible.includes(t) ? ({ ...t, completed: checked }) : t));
    }

    function checkDate(value) {
        const pad = (n) => String(n).padStart(2, '0');
        const d = new Date();

        const todayLocalISO = (() => {
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;})();

        const dataDate = value;

        let tomorrow = (() => {
            let tomorrowDate = new Date(d); 
            tomorrowDate.setDate(tomorrowDate.getDate() + 1);
            return tomorrowDate.getFullYear()+'-'+String(tomorrowDate.getMonth() + 1).padStart(2, "0")+'-'+String(tomorrowDate.getDate()).padStart(2, "0")})()

        if (dataDate!== '' && dataDate < todayLocalISO) return 'overdue' // 'overdue'
        else if (dataDate === todayLocalISO) return 'today'
        
        else if (dataDate === tomorrow) return 'tomorrow'
        else return ''
    }

    function addTag(id) {
        console.log(id)
        if (!filters.tags.includes(id)) {
            setFilters(prev=>({...prev, tags: [...prev.tags, id]}))
        }
        else {
            setFilters(prev=>({...prev, tags: prev.tags.filter(tag=>tag!==Number(id))}))
        }
    }

    // console.log('trash', trash)
    return (
        <>
        <div className={styles.chipsContainer}>
                    <span className={styles.priorityLegend}>
                        <span className={styles.low}>&nbsp;</span><span>low</span> 
                        <span className={styles.medium}>&nbsp;</span><span>medium</span> 
                        <span className={styles.high}>&nbsp;</span><span>high</span>
                    </span>
                    <Chips /><Tags />
        </div>
            
        <table className={styles.tasksListeTable}> 
            <TasksTableHeader 
                sortBy={sortBy} 
                sortTasks={sortTasks} 
                checkAllTasks={checkAllTasks}/>
            <tbody>
                {sortedVisible.length === 0 && (
                    <tr className={styles.noTasks}>
                        <td colspan='8'>No tasks found</td>
                    </tr>
                )}
            {sortedVisible.map(task => { 
                const pClass = styles[colors[task.priority ?? 2]];
                return (
                    <tr key={task.id} className={`${task.completed ? styles.completed : ''} ` }>
                        <td className={pClass}></td>
                        <td>
                            <input 
                                type='checkbox' 
                                onChange={()=>makeCompleted(task.id)} 
                                checked={task.completed}
                            />
                        </td>
                        <td className={styles.nameTdcontainer}>
                            <button 
                                onClick={()=>openModal('editTask', task.id)}
                                className={`${task.completed ? styles.strike : ''} ${styles.taskNameBtn} ` }>
                                    {task.name.slice(0,50)}{task.name.length> 50 ? '...' : ''} 
                            </button>
                            {task.tags?.length > 0 && (
                                <div className={styles.tagsAreaBlock}>
                                    {task.tags?.map(tag => {
                                        let tempTag = tags.find(t => t.id === tag)
                                        return <button 
                                                className={styles.tagBtn}
                                                onClick={()=>addTag(tempTag.id)}
                                                key={tag.id}> 
                                                {'#' + tempTag.name} 
                                            </button> 
                                    })}
                                </div>
                                )
                            }
                        </td>
                        <td>
                            <button 
                                onClick={()=>setFilters(prev=>({...prev, category:  task.categoryId}))} 
                                title = {`show tasks in category`} 
                                className={styles.categoryBtn}>
                                    {categories.find(category => category.id === task.categoryId)?.name.slice(0,15) ?? 'No category'}
                            </button>
                        </td>
                        <td className={styles.dueDateTd}>
                            <span 
                                className={`
                                    
                                    ${checkDate(task.dueDate) === 'overdue' ? styles.overdue : ''}
                                    ${task.completed ? styles.completed : ''}`
                            }>
                                {pretty(task.dueDate)} 
                                {(checkDate(task.dueDate) !=='') && (checkDate(task.dueDate) !=='overdue') && (
                                <span > {checkDate(task.dueDate) === 'today'
                                    ? <span className={styles.todayHint}>today</span> 
                                    : checkDate(task.dueDate) === 'tomorrow' 
                                        ? <span className={styles.tomorrowHint}>tomorrow</span>  : ''} 
                                </span>
                                )}
                            </span>
                        </td>
                        <td>
                            <span className={styles.priorityBlock} >
                                {colors[task.priority]}
                            </span>
                        </td>
                        <td className={styles.taskButtons}>
                            <button onClick={()=>openModal('editTask', task.id)} className={styles.taskEditBtn}>
                                <i className="fa-solid fa-pencil fa-lg"></i>
                            </button>
                            <button onClick={()=>deleteTask(task.id)} className={styles.taskDeleteBtn}>
                                <i className="fa-solid fa-trash-can fa-lg"></i>
                            </button>
                        </td>
                    </tr>
                    )
            })}
            </tbody>
        </table>
        </>
    )
}