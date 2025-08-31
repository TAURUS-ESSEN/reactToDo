import {useState} from 'react';
import Modal from "./Modal";
import styles from "./modal.module.css";
export default function ShowCategoriesModal({categories, tasks, setTasks, setCategories, openModal, closeModal}) {

    const [categoryNewName, setCategoryNewName] = useState({id: null, name: ''});
    const [showBlocks, setShowBlocks] = useState({
        showNameInput: false,
        showDeleteBlock: false,
        selectCategory: false,
        id: null,
        tasks: '',
        tasksToCategory: '',
        canClick: true,
        hideDeleteButton: false,
    })

    function changeVisible(id, name) {
        setShowBlocks(prev=>({...prev, showNameInput: true}))
        setCategoryNewName({id: id, name: name})
    }

    function preDelete(id, taskNumbers) {
        taskNumbers.length === 0 
            ? setCategories(prev => prev.filter(ca=>ca.id!==id))
            : setShowBlocks(prev=>({...prev, showDeleteBlock: true, id: id, hideDeleteButton: true,}))
    }

    function saveData(id) {
        console.log('id', id)
        setCategories(prev=>prev.map(c => (c.id === id ? {...c, name:categoryNewName.name} : c)))
        setCategoryNewName({id: null, name: ''});
        setShowBlocks(prev=>({...prev, showNameInput: false}))
    }

    function setCategoryTasks(e) {
        switch (e) {
            case 'delete':
                return setShowBlocks(prev=>({...prev, selectCategory: false, tasks: 'delete', tasksToCategory: ''}))
            case 'nocategory':
                return setShowBlocks(prev=>({...prev, selectCategory: false, tasks: '', tasksToCategory: ''}))
            case 'move':
                return setShowBlocks(prev=>({...prev, selectCategory: true, tasks: 'move'}))
        }
    }

    function cancelDeleteCategory() {
        setShowBlocks(prev=> ({
            ...prev,
            showDeleteBlock: false,
            selectCategory: false,
            id: null,
            tasks: '',
            tasksToCategory: '',
            hideDeleteButton: false,
        }))
    }

    function deleteCategory(id) {
        switch (showBlocks.tasks) {        
            case ('move'): 
                setCategories(prev=>prev.filter(c=>c.id!==id))
                setTasks(prev=>prev.map(t=>
                t.category === id ? {...t, category: Number(showBlocks.tasksToCategory) } : t 
            ));
            break;

            case ('delete'): 
                setCategories(prev=>prev.filter(c=>c.id!==id))
                setTasks(prev=>prev.filter(t=>t.category!==id))
                console.log('id', id)
                console.log('showBlock', showBlocks)
                break;

            default : 
                setCategories(prev=>prev.filter(c=>c.id!==id))
                setTasks(prev=>prev.map(t=>
                    t.category === id ? {...t, category: null } : t 
                ));
                break;
        }
    }

    return (
        <>
        <Modal title={'Manage categories'} closeModal={closeModal}>
            <div className={styles.categoryContainer}>
                {categories.map(c => {
                    let taskNumbers = tasks.filter(t=>t.category===c.id);
                    // {(!showBlocks.showDeleteBlock &&  showBlocks.id!==c.id) && ()}
                    return <li key={c.id}>
                        <div className={styles.currentCategoryBlock}>
                            <span className={styles.categoryNameSpan}> 
                                {(!showBlocks.showNameInput || categoryNewName.id!==c.id) && ( 
                                    <>
                                    <button 
                                        className={styles.categoryNameButton} 
                                        onClick={()=>changeVisible(c.id, c.name)} 
                                        title={c.name}
                                    >{c.name.slice(0,50)}{c.name.length>40? '...' : ''} <i class="fa-solid fa-pencil fa-2xs"></i></button>
                                    </>
                                )}
                                {(showBlocks.showNameInput && categoryNewName.id===c.id) && ( <>
                                <input 
                                    type='text' 
                                    className={styles.inputCategoryName} 
                                    onKeyDown={(e)=> {
                                        if (e.key==='Enter') saveData(c.id)
                                        if (e.key==='Escape') { e.stopPropagation(); setShowBlocks(prev=>({...prev, showNameInput: false }))}
                                        }
                                    }
                                    autoFocus
                                    onChange = {(e)=>setCategoryNewName(prev=>({...prev, name: e.target.value}))}
                                    onBlur = {()=>saveData(c.id)}
                                    value={categoryNewName.name} /> 
                                <button 
                                    onClick={()=>saveData(c.id)} 
                                    className={styles.saveButton}
                                    title='Rename Category'
                                >✓</button></>

                                )}
                            </span>
                            <span className={styles.taskNumberSpan}> {taskNumbers.length} {taskNumbers.length === 1 ? 'task' : 'tasks'}</span> 
                            
                            {(!showBlocks.hideDeleteButton || showBlocks.id!==c.id)  && (
                                <span>
                                    <button onClick={()=>preDelete(c.id, taskNumbers)} className={styles.preDeleteButton} title="Delete Category"><i class="fa-solid fa-trash-can"></i> Delete </button>                                    
                                </span>
                            )}
                        </div>

                        {showBlocks.showDeleteBlock && showBlocks.id===c.id && (
                            <div className={styles.deleteCategoryBlock}>
                                <div className={styles.header}>Category <strong>{c.name.slice(0,40)}{c.name.length>40?'...' : ''}</strong> is not empty and has {taskNumbers.length} tasks. Choose what to do with them:</div>
                                <div>
                                <div className={styles.radioContainer}>
                                    <label className={styles.radioLabels}> Keep tasks (remove category)
                                        <input type="radio" name='category' onChange={(e)=>setCategoryTasks(e.target.value)} value='nocategory' checked={showBlocks.tasks ===''} />
                                    </label>
                                    <label className={styles.radioLabels}> Move tasks to:
                                        <input type="radio" name='category' onChange={(e)=>setCategoryTasks(e.target.value)} value='move'/>
                                    </label>
                                           {showBlocks.selectCategory && (
                                    <select onChange={(e)=>setShowBlocks(prev=>({...prev, tasksToCategory: e.target.value}))} required>
                                        <option value='' disabled selected>Choose Category</option>
                                        {categories.map(ca=> {
                                            return <option value={ca.id} disabled={ca.id === c.id}>{ca.name.slice(0,30)}{ca.name.length>30? '...' : ''}</option>
                                        })}
                                    </select>
                                )}
                                    <label className={styles.radioLabels}> Delete tasks and category
                                        <input type="radio" name='category' onChange={(e)=>setCategoryTasks(e.target.value)} value='delete'/>
                                    </label>
                                </div>
                                
                         
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={cancelDeleteCategory} className={styles.cancelButton}>Cancel</button>
                        <button 
                            onClick={()=>deleteCategory(c.id)} 
                            disabled={!showBlocks.canClick} 
                            className={styles.deleteButton}
                        >Delete</button>
                    </div>
            </div>
                        )}
                    </li>
                        

                })}
            </div>
            <div className={styles.addNewButton}><button onClick={()=>openModal('addCategory')} title="Add new category"><i class="fa-solid fa-plus fa-2xs"></i> Add category</button></div>
        </Modal>
        </>
    )
}