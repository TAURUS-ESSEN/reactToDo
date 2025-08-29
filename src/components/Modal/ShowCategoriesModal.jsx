import {useState} from 'react';
import Modal from "./Modal";
import styles from "./modal.module.css";
export default function ShowCategoriesModal({categories, tasks, setTasks, setCategories, closeModal}) {
    const [isEditing, setIsEditing] = useState('none');
    const [value, setValue] = useState({id: null, name: ''});
    const [visible, setVisible] = useState(false)

    function changeVisible(id, name) {
        setValue({id: id, name: name})
        setVisible(true);
    }

    return (
        <>
        <Modal title={'Categories List'} closeModal={closeModal}>
            {console.log('value',value)}
            <div>
                {categories.map(c=>{
                    let taskNumbers = tasks.filter(t=>t.category===c.id)
                    return <li className={styles.categoryList}>
                        <span> 
                            {(!visible  || value.id!==c.id) && ( 
                            <button className='' onClick={()=>changeVisible(c.id, c.name)}>{c.name}</button>
                            )}
                            {(visible && value.id===c.id) && ( 
                            <input 
                                type='text' 
                                className='' 
                                value={value.name} /> 
                            )}
                        </span>
                        <span> {taskNumbers.length}Tasks</span> <span><button>Delete</button></span>
                        </li>
                })}
            </div>
        </Modal>
        </>
    )
}