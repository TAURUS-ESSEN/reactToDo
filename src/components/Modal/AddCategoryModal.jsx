import styles from './modal.module.css';
import Modal from './Modal';
import { useState } from 'react';

export default function AddCategoryModal({categories, setCategories, closeModal}) {
    const [categoryName, setCategoryName] = useState('');
    const lenghtOK = categoryName.length > 1;
    const nameExist = categories.some(c => c.name.toLowerCase() === categoryName.toLowerCase());
    const canClick = lenghtOK && !nameExist;
    const errorMessage = nameExist ? 'Name already exists' : '';

    function onSubmit(e) {
        e.preventDefault()
        const newCatId = categories[categories.length-1].id + 1;
        setCategories(prev => [...prev, { id:newCatId  , name: categoryName }]);
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
                    <label>Enter category name</label>
                    <input type='text' 
                        onChange={(e) => setCategoryName(e.target.value)} 
                        value={categoryName}
                        // onBlur = {(e) => setCategoryName(e.target.value.trim())} 
                        maxLength={50}
                        autoFocus 
                        required
                        placeholder='min 2 characters'
                    />
                    <div className={styles.errorMessageArea}>{errorMessage}</div>
                    <div className={styles.buttons}>
                        <button type="button" onClick={cancel} className={styles.cancelBtn}>Cancel</button>
                        <button type='submit' disabled={!canClick} className={styles.addNewBtn}>
                            <i className="fa-solid fa-plus fa-2xs"></i> 
                            Add category
                        </button>      
                    </div>
                </form>
            </Modal>
        </>
    )
}