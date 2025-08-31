import styles from './modal.module.css';
import Modal from './Modal'
import {useEffect, useState} from 'react';

export default function AddCategoryModal({categories, setCategories, closeModal}) {
    const [categoryName, setCategoryName] = useState('');
    const [canClick, setCanClick] = useState({nameExist: false, minLength: false})
    const [errorMessage, setErrorMessage] = useState('')

    function onSubmit(e) {
        e.preventDefault()
        const newCatId = categories[categories.length-1].id + 1;
        setCategories(prev=>[...prev, {id:newCatId  , name: categoryName}]);
        setCategoryName('');
        closeModal();
    }

    function cancel() {
        setCategoryName('');
        closeModal();
    }
    
    useEffect(()=>{
        setCanClick({
            nameExist: categories.filter(c=>c.name.toLowerCase()===categoryName.toLowerCase()).length > 0, 
            minLength: categoryName.trim().length > 1 
        }) 
    },[categoryName])

    useEffect(()=>{
        canClick.nameExist ? setErrorMessage('Name already exists')  : setErrorMessage('');
    },[canClick])

    return (
        <>
            <Modal title='Create category' closeModal={closeModal}>
                <form  onSubmit={onSubmit} className={styles.createForm}>
                    <label>Enter category name</label>
                    <input type='text' onChange={(e)=>setCategoryName(e.target.value.trim())} value={categoryName} autoFocus required/>
                    <div className={styles.errorMessageArea}>{errorMessage}</div>
                    <div className={styles.buttons}>
                        <button type="button" onClick={cancel} className={styles.cancelBtn}>Cancel</button>
                        <button type='submit' disabled={!canClick.minLength || canClick.nameExist} className={styles.addNewBtn}>
                            <i className="fa-solid fa-plus fa-2xs"></i> 
                            Add category
                        </button>      
                    </div>
                </form>
            </Modal>
        </>
    )
}