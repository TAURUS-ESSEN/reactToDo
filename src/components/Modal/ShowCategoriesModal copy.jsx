import {useState} from 'react';
import Modal from "./Modal";
import styles from "./modal.module.css";
export default function ShowCategoriesModal({categories, tasks, setTasks, setCategories, closeModal}) {

    const [value, setValue] = useState({id: null, name: ''});
    const [visible, setVisible] = useState(false)
    const [deleteBlock, setDeleteBlock] = useState(false);
    const [selectCategoryBlock, setSelectCategoryBlock] = useState(false);

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
                                onChange = {(e)=>setValue(prev=>({...prev, name: e.target.value}))}
                                onBlur = {()=>saveData(c.id)}
                                value={value.name} /> 
                            <button onClick={()=>saveData(c.id)}>save</button></>

                            )}
                        <span> {taskNumbers.length}Tasks</span> 

                        </span>
                        <span><button onClick={()=>setDeleteBlock(true)}>Delete</button></span>
                        </div>
                        {deleteBlock && (
                            <div className={styles.deleteBlock}>
                                <div>Delete {c.name} category?</div>
                                <div>
                                    <span>{c.name} has {taskNumbers.length} tasks:</span> 
                                <div>
                                    <label> Without Category
                                    <input type="radio" name='category' value='1'/></label>
                                     <label> Move to Category
                                    <input type="radio" name='category' onChange={()=>{setSelectCategoryBlock(true)}} value='2'/></label>
                                     <label> Delete all
                                    <input type="radio" name='category' value='2'/></label>
                                </div>
                                {selectCategoryBlock && (
                                    <select>
                                        {categories.map(c=> {
                                            return <option value={c.id}>{c.name}</option>
                                        })}
                                    </select>
                                )}
                                </div>
                                <div className={styles.buttons}>
                                    <button onClick={()=>closeModal()}>Cancel</button>
                                    <button onClick=''>Delete</button>
                                </div>
                            </div>
                        )}
                    </li>
                        

                })}
            </div>
        </Modal>
        </>
    )
}