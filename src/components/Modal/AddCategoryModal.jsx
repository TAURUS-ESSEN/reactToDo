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
            <Modal title='create Category' closeModal={closeModal}>
                <form  onSubmit={onSubmit}>
                    <label>Category Name</label>
                    <input type='text' onChange={(e)=>setCategoryName(e.target.value)} value={categoryName}/>
                    {categoryName}
                    <button type="button" onClick={closeModal}>Cancel</button>
                    <button type='submit' disabled={!canClick}>Save</button>
                </form>
            </Modal>
        </>
    )
}