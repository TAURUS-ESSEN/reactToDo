import { useState } from "react";
import { downloadJSON } from "../utils/downloadJSON";

export default function Sidebar({setTasks, openModal, tasks, categories}) {
    const [quickTask, setQuickTask] = useState('');
    const canQuickAdd = quickTask.trim().length > 0;
    const createId = () => Date.now() + Math.floor(Math.random() * 1000);

    function addQuickTask() {
        if (!canQuickAdd) return;
        setTasks(prev=>[...prev, {id: createId(), name: quickTask, description: '', isReady: false, priority: 1, category: 0, dueDate: ''}])
        setQuickTask('');
    }

    return (
        <>
        <div className="sidebar">
            <h2>ToDo List</h2>
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
            <div className="buttonsBlock">
                <button onClick={()=>openModal('addTask')}>Add task</button>
                <button onClick={()=>openModal('addCategory')}>Add category</button>
                <button onClick={()=>openModal('showCategories')}>Manage categories</button>
                <button type='button' 
                        onClick={() => downloadJSON({ schemaVersion: 1, exportedAt: new Date(),  tasks, categories // добавь сюда свои задачи
  })}>Export data</button>
            </div>
        </div>
        </>
    )
}