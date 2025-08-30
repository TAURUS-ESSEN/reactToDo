import {useState, useEffect} from 'react';
import Modal from "./Modal";
import styles from "./modal.module.css";
export default function ShowCategoriesModal({categories, tasks, setTasks, setCategories, openModal, closeModal}) {

    const [value, setValue] = useState({id: null, name: ''});
    const [visible, setVisible] = useState(false)
    const [showBlocks, setShowBlocks] = useState({
        deleteBlock: false,
        selectCategory: false,
        id: null,
        tasks: '',
        tasksToCategory: '',
        canClick: true,
        hideDeleteButton: false,
    })

    function changeVisible(id, name) {
        setValue({id: id, name: name})
        setVisible(true);
    }

    function saveData(id) {
        console.log('id', id)
        setCategories(prev=>prev.map(c => (c.id === id ? {...c, name:value.name} : c)))
        setValue('');
        visible(false);
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
            deleteBlock: false,
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
                console.log('id', id)
                console.log('showBlock', showBlocks)
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
        <Modal title={'Categories List'} closeModal={closeModal}>
            <div className={styles.categoryContainer}>

                {categories.map(c=>{
                    let taskNumbers = tasks.filter(t=>t.category===c.id)
                    return <li className={styles.currentCategory}>
                        <div className={styles.categoryList}>
                        <span> 
                            {(!visible  || value.id!==c.id) && ( 
                            <button className={styles.categoryNameButton} onClick={()=>changeVisible(c.id, c.name)}>{c.name}</button>
                            )}
                            {(visible && value.id===c.id) && ( <>
                            <input 
                                type='text' 
                                className='' 
                                onKeyDown={(e)=> e.key==='Enter' && saveData(c.id)}
                                onChange = {(e)=>setValue(prev=>({...prev, name: e.target.value}))}
                                onBlur = {()=>saveData(c.id)}
                                value={value.name} /> 
                            <button onClick={()=>saveData(c.id)}>save</button></>

                            )}
                        <span> {taskNumbers.length}Tasks</span> 

                        </span>
                        
                                    {(!showBlocks.hideDeleteButton || showBlocks.id!==c.id)  &&(
                            <span>
                            <button onClick={()=>taskNumbers.length === 0? setCategories(prev => prev.filter(ca=>ca.id!==c.id)): setShowBlocks(prev=>({...prev, deleteBlock: true, id: c.id, hideDeleteButton: true,}))}>Delete</button></span>
                                    )}
                            
                        </div>
                        {showBlocks.deleteBlock && showBlocks.id===c.id && (
                            <div className={styles.deleteBlock}>
                                <div>Delete <strong>{c.name}</strong> category?</div>
                                <div>
                                    <span>{c.name} has {taskNumbers.length} tasks. What shall we do?:</span> 
                                <div>
                                    <label> Without Category
                                    <input type="radio" name='category' onChange={(e)=>setCategoryTasks(e.target.value)} value='nocategory' checked={showBlocks.tasks ===''} /></label>
                                    <label> Move to Category
                                    <input type="radio" name='category' onChange={(e)=>setCategoryTasks(e.target.value)} value='move'/></label>
                                    <label> Delete all
                                    <input type="radio" name='category' onChange={(e)=>setCategoryTasks(e.target.value)} value='delete'/></label>
                                </div>
                                {showBlocks.selectCategory && (
                                    <select onChange={(e)=>setShowBlocks(prev=>({...prev, tasksToCategory: e.target.value}))} required>
                                        <option value='' disabled selected >Choose Category</option>
                                        {categories.map(ca=> {
                                            return <option value={ca.id} disabled={ca.id === c.id}>{ca.name}</option>
                                        })}
                                    </select>
                                )}
                                    {showBlocks.tasksToCategory}

                                </div>
                                <div className={styles.buttons}>
                                    <button onClick={cancelDeleteCategory}>Cancel</button>
                                    <button onClick={()=>deleteCategory(c.id)} disabled={!showBlocks.canClick} className={styles.deleteButton}>Delete</button>
                                </div>
                            </div>
                        )}
                    </li>
                        

                })}
            </div>
            <div className={styles.addNewButton}><button onClick={()=>openModal('addCategory')}>Add new</button></div>
        </Modal>
        </>
    )
}