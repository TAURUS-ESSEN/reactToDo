import { useState } from "react";

export default function Sidebar({setTasks, openModal}) {
    const [quickTask, setQuickTask] = useState('');
    const canQuickAdd = quickTask.trim().length > 0;
    const createId = () => Date.now() + Math.floor(Math.random() * 1000);

    function addQuickTask() {
        if (!canQuickAdd) return;
        setTasks(prev=>[...prev, {id: createId(), name: quickTask, description: '', isReady: false}])
        setQuickTask('');
    }

    return (
        <>
        <div className="sidebar">
            <h2>ToDo List</h2>
            <input type='text' 
                onChange={(e)=>setQuickTask(e.target.value)} 
                value={quickTask}
                placeholder="quick adding"
            />
            {/* {quickTask} */}
            <button onClick={addQuickTask} disabled={!canQuickAdd}>Quick Add</button>
            <button onClick={()=>openModal('addCategory')}>Add Categorie</button>
            <button onClick={()=>openModal('addTask')}>Add Task</button>
        </div>
        </>
    )
}