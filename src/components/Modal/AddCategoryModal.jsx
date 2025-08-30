import styles from './modal.module.css';
import Modal from './Modal'
import {useState} from 'react';

export default function AddCategoryModal({categories, setCategories, closeModal}) {
    const [categoryName, setCategoryName] = useState('');
    const canClick = categoryName.trim().length > 0;

    function onSubmit(e) {
        if (!canClick) return
        e.preventDefault()
        const newCatId = categories[categories.length-1].id + 1;
        console.log(newCatId);
        setCategories(prev=>[...prev, {id:newCatId  , name: categoryName}])
        setCategoryName('');
        closeModal();
    }

    return (
        <>
            <Modal title='Create Category' closeModal={closeModal}>
                <form  onSubmit={onSubmit} className={styles.createForm}>
                    <label>Enter category name</label>
                    <input type='text' onChange={(e)=>setCategoryName(e.target.value)} value={categoryName} autofocus required/>
                    <div className={styles.buttons}>
                        <button type="button" onClick={closeModal}>Cancel</button>
                        <button type='submit' disabled={!canClick}>Save</button>      
                    </div>

                </form>
            </Modal>
        </>
    )
}