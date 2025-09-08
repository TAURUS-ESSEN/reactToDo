import styles from './modal.module.css';
import Modal from './Modal';
import { useState } from 'react';

export default function AddCategoryModal({categories, setCategories, setToasts, closeModal}) {
    const [categoryName, setCategoryName] = useState('');
    const lenghtOK = categoryName.length > 1;
    const nameExist = categories.some(c => c.name.toLowerCase() === categoryName.toLowerCase());
    const canClick = lenghtOK && !nameExist;
    const errorMessage = nameExist ? 'Name already exists' : '';

    function onSubmit(e) {
        e.preventDefault()
        const newCatId = categories[categories.length-1].id + 1;
        setCategories(prev => [...prev, { id:newCatId  , name: categoryName }]);
        const id = Date.now() + Math.random();
        setToasts(prev=>([...prev, { id, message: <> Category {categoryName} was added </> }]))
        setCategoryName('');
        closeModal();
    }

    function cancel() {
        setCategoryName('');
        closeModal();
    }
    
    return (
        <>
            <Modal title='Create category' closeModal={closeModal}>
                <form onSubmit={onSubmit} className={styles.createForm}>
                    <label>Enter category name:</label>
                    <input type='text' 
                        onChange={(e) => setCategoryName(e.target.value)} 
                        value={categoryName}
                        // onBlur = {(e) => setCategoryName(e.target.value.trim())} 
                        maxLength={50}
                        autoFocus 
                        required
                        placeholder='min 2 characters'
                    />
                    <div className={styles.errorMessageBlock}>{errorMessage}</div>
                    <div className={styles.buttonsBlock}>
                        <button type="button" onClick={cancel} className={styles.cancelBtn} title='cancel add'>Cancel</button>
                        <button type='submit' disabled={!canClick} className={styles.addNewBtn} title='add new category'>
                            +Add category
                        </button>      
                    </div>
                </form>
            </Modal>
        </>
    )
}