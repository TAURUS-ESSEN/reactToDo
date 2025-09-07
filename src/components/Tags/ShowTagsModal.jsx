import {useState} from 'react'
import Modal from "../Modal/Modal"
import styles from './tags.module.css'

export default function ShowTagsModal({tags, setTags, setTasks, tasks, closeModal}) {
    const [tagNewName, setTagNewName] = useState('')
    const [newTag, setNewTag] = useState('')
    const [showBlock, setShowBlock] = useState({
        showButton: true,
        showInput: false,
        showConfirme: false,
        id: null,
    })
    let affected = []; 

    function addNewTag() {
        let lastId = tags[tags.length-1].id + 1
        setTags(prev=>([...prev, { id: lastId, name:newTag }]))
        setNewTag('');
    }

    function renameTag(id) {
        setTags(prev=>(prev.map(t=>t.id === id ? {...t, name:tagNewName.slice(0.15)} : t)))
        setShowBlock(prev => ({...prev, showButton: true, showInput: false, id:null}))
        setTagNewName('')
    }

    function cancelDeleteTag() {
        setShowBlock(prev => ({...prev, showConfirme: false}))
    }

    function deleteTag(id) {
        affected = tasks.filter(task => task.tags.includes(id))
        if (affected.length === 0 ){

            setTags(prev => prev.filter(t=>t.id !=id))
            setTagNewName('')
            setShowBlock(prev => ({...prev,         showButton: true, showInput: false, showConfirme: false, id: null}))
        }
        else {
            setShowBlock(prev => ({...prev, showConfirme: true, showButton: false, showInput: true, id:id}))
        }
    }

    function deleteTagWithTasks(id) {
        setTasks(prev=>(prev.map(task=> {
        if (task.tags.includes(id)) {
            return {...task, tags: task.tags.filter(tag=> tag!==id)}
        }    
        else return task
        })))
        setTags(prev => prev.filter(t=>t.id !=id))
        setShowBlock(prev => ({...prev, showButton: true, showInput: false, showConfirme: false, id: null}))
    }


    function toggleBlocks(id) {
        // setShowBlock(prev => ({...prev, showButton: !prev.showButton , showInput: prev.showInput, id:id}))
        setShowBlock(prev => ({...prev, showButton: false, showInput: true, id:id}))
    }

    return (
        <>
        <Modal title="#tags management" closeModal={closeModal}>
            <div>  
                <input 
                    type='text' 
                    onChange={(e)=>setNewTag(e.target.value.slice(0.15))}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') addNewTag();
                        if (e.key === 'Escape') {e.stopPropagation(); setNewTag('') };
                    }}                    
                    blur = {()=>setNewTag('')}
                    value={newTag} 
                    maxLength={20}
                />
                <button onClick={addNewTag}>+</button>
                {
                    tags.map(t => {
                        return (
                            <div className={styles.tagList}>  
                                <div className={styles.tagRow}>

                                    {(showBlock.showButton || showBlock.id != t.id ) && (
                                        <button 
                                            onClick={()=>toggleBlocks(t.id)}
                                        >#{t.name}</button>
                                    )}

                                    {(!showBlock.showButton && showBlock.id == t.id ) && (
                                        <>
                                        <input 
                                            type='text' 
                                            onChange={(e)=>setTagNewName(e.target.value)} 
                                            autoFocus 
                                            value={tagNewName === '' ? t.name : tagNewName}
                                        /> 
                                        <button onClick={()=>renameTag(t.id)}>✓</button>
                                        </>
                                    )}

                                    { tasks.filter(task => task.tags.includes(t.id)).length}
                                    {(!showBlock.showConfirme || showBlock.id !== t.id ) && (
                                    <button onClick={()=>deleteTag(t.id)}><i className="fa-solid fa-trash-can"></i></button>
                                    )}

                                    {(showBlock.showConfirme && showBlock.id == t.id ) && (
                                        <>
                                            <div className={styles.deleteConfirmationBlock}>
                                                Delete {t.name} affected { tasks.filter(task => task.tags.includes(t.id)).length} tasks. Want you realy delete this hashtag?
                                                <div className={styles.confirmationButtonsBlock}>
                                                    <button onClick={()=>cancelDeleteTag(t.id)}>Cancel</button>
                                                    <button onClick={()=>deleteTagWithTasks(t.id)}>Delete</button>
                                                </div>
                                            </div>
                                        </> 
                                    )}

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Modal>
        </>
    )
}