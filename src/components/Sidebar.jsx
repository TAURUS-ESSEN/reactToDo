import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { downloadJSON } from "../utils/downloadJSON";
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

export default function Sidebar({setTasks, filters, setFilters, openModal, tasks, categories, setToasts, tags}) {
    const [quickTask, setQuickTask] = useState('');
    const canQuickAdd = quickTask.trim().length > 1;
    const genId = () => Date.now() + Math.floor(Math.random() * 1000);
    const [dueDate, setDueDate] = useState(null); 

    function addQuickTask() {
        if (!canQuickAdd) return;
        setTasks(prev=>[...prev, {id: genId(), name: quickTask, description: '', completed: false, priority: 1, category: 0, dueDate: '', tags: []}])
        setToasts(prev=>([...prev, {message: `${quickTask} was added`}]))
        setQuickTask('');
    }

    useEffect(()=>{
        setFilters(prev=>({...prev,  dueDate: dueDate ? format(dueDate, 'yyyy-MM-dd') : 'all'}))
    },[dueDate])

    function addTagToFilters(id) {
        filters.tags.includes(id) 
        ? setFilters(prev => ({...prev, tags: prev.tags.filter(tag => tag !==id )}))
        : setFilters(prev => ({...prev, tags: [...prev.tags, id]}))
    }
        // console.log(filters.tags)

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
                {/* <div className="categoryBtns"> */}
                    <button onClick={()=>openModal('addCategory')}>Add category</button>
                    <button onClick={()=>openModal('showCategories')}>Manage categories</button>
                    {/* <button onClick={()=>openModal('showCategories')} className="gearBtn"><i className="fa-solid fa-gear" style={{color: '#3b3b3b'}}></i></button> */}
                {/* </div> */}
                {/* <button onClick={()=>openModal('showTags')}>Manage Tags</button> */}
                <button type='button' 
                        onClick={() => downloadJSON({ schemaVersion: 1, exportedAt: new Date(),  tasks, categories })}>Export data</button>
            </div>
            <div>
                <DayPicker
                    className='calendar'
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    weekStartsOn={1}
                />                
            </div>
            <div className="tagsDetails">
                <details open>
                    <summary>Task tags 
                        <span className="gearTags">
                            <button type='button' onClick={()=>openModal('showTags')} title='Tags management'>
                                <i className="fa-solid fa-gear fa-sme" ></i>
                            </button>
                        </span>
                    </summary>
                    {tags.length > 0 && (
                        <div className="tagsBlock">
                        {tags.map(tag => {
                            return <button 
                                    className={`tagBtn ${filters.tags.includes(tag.id) ? 'tagEnabled' : ''}`} 
                                    onClick={()=>addTagToFilters(tag.id)}
                                    key = {tag.id}
                                    disabled={!filters.tags.includes(tag.id) && filters.tags.length>=5}
                                    >#{tag.name}
                                </button>
                        } )}
                        </div>
                    )
                    } 
                </details>
            </div>
        </div>
        </>
    )
}