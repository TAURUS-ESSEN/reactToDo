import { useState } from "react";
import { Link } from "react-router-dom";
import { downloadJSON } from "../utils/downloadJSON";

export default function Sidebar({setTasks, openModal, tasks, categories}) {
    const [quickTask, setQuickTask] = useState('');
    const canQuickAdd = quickTask.trim().length > 1;
    const genId = () => Date.now() + Math.floor(Math.random() * 1000);

    function addQuickTask() {
        if (!canQuickAdd) return;
        setTasks(prev=>[...prev, {id: genId(), name: quickTask, description: '', completed: false, priority: 1, category: 0, dueDate: ''}])
        setQuickTask('');
    }

    return (
        <>
        <div className="sidebar">
            <Link to='/' className="logoLink"><h2>ToDo List</h2></Link>
            <div className="quickAddBlock">
                <input type='text' 
                    onChange={(e)=>setQuickTask(e.target.value)} 
                    value={quickTask}
                    placeholder="Quick add task"
                    onKeyDown={(e)=>{if (e.key==='Enter') addQuickTask() }  }
                    className="quickAddInput"
                />
                <button onClick={addQuickTask} disabled={!canQuickAdd} className="quickAddBtn">+</button>
            </div>
            <div className="sidebarButtonsBlock">
                <button onClick={()=>openModal('addCategory')}>Add category</button>
                <button onClick={()=>openModal('showCategories')}>Manage categories</button>
                <button type='button' 
                        onClick={() => downloadJSON({ schemaVersion: 1, exportedAt: new Date(),  tasks, categories })}>Export data</button>
            </div>
        </div>
        </>
    )
}