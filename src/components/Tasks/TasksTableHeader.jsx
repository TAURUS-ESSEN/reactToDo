import styles from '../tagsAndTasks.module.css'


export default function TasksTableHeader({sortBy,sortTasks,checkAllTasks }) {

    return (
        <>
            <thead>
                <tr>
                    <th></th>
                    <th className={styles.checkAll}><input type='checkbox' onChange={(e)=>checkAllTasks(e)} id='checkAll' /></th>
                    <th className={styles.tasksBlockSorting}>
                        <button onClick={()=>sortBy('name')}>
                            Task Name { sortTasks.by !== 'name'? '↕' : sortTasks.dir === 'asc' ? '▲'  : '▼'} 
                        </button>
                    </th>
                    <th className={styles.tasksBlockSorting}>
                        <button onClick={()=>sortBy('dueDate')}>Task Category</button>
                    </th>
                    <th className={`${styles.tasksBlockSorting} ${styles.dueDateTd}`}>
                        <button onClick={()=>sortBy('dueDate')}>
                            Due Date { sortTasks.by !== 'dueDate'? '↕' : sortTasks.dir === 'asc' ? '▲'  : '▼'} 
                        </button>
                    </th>
                    <th className={styles.tasksBlockSorting}>
                        <button onClick={()=>sortBy('priority')}>
                            Priority { sortTasks.by !== 'priority'? '↕' : sortTasks.dir === 'asc' ? '▲'  : '▼'} 
                        </button>
                    </th>
                    <th> </th>
                </tr>
            </thead>         
        </>
    )
}