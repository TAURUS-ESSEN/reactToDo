import {useState, useEffect} from 'react'
import Modal from "../Modal/Modal"
import styles from './tags.module.css'
import { useAppContext } from '../../context/AppContext';

export default function ShowTagsModal() {
    const {tags, setTags, setTasks, tasks, closeModal} = useAppContext();
    const [tagNewName, setTagNewName] = useState('');
    const [newTag, setNewTag] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const canClick = newTag.length > 2;

    const [showBlock, setShowBlock] = useState({
        showButton: true,
        showInput: false,
        showConfirme: false,
        id: null,
    })
    let affected = []; 

    function addNewTag() {
        const nameExist = tags.some(t => t.name.toLowerCase() === newTag.toLowerCase());
        if (!nameExist && newTag.length > 2) {
            let lastId = tags[tags.length - 1].id + 1;
            setTags(prev => ([...prev, { id: lastId, name:newTag}]));
            setNewTag('');
        }
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
        if (affected.length === 0 ) {
            setTags(prev => prev.filter(t=>t.id !=id))
            setTagNewName('')
            setShowBlock(prev => ({...prev, showButton: true, showInput: false, showConfirme: false, id: null}))
        }
        else {
            setShowBlock(prev => ({...prev, showConfirme: true, showButton: true, showInput: false, id:id}))
            setTagNewName(name)
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

    function toggleBlocks(id,name) {
        // setShowBlock(prev => ({...prev, showButton: !prev.showButton , showInput: prev.showInput, id:id}))
        setShowBlock(prev => ({...prev, showButton: false, showInput: true, id:id}))
        setTagNewName(name)
    }

    useEffect(() => {
        const nameExist = tags.some(t => t.name.toLowerCase() === newTag.toLowerCase());
        if (nameExist)  {
            setErrorMessage('Name already exists') 
            document.getElementById('addTagBtn').disabled = true
        }
        else if (newTag.length < 3 ) {
            setErrorMessage('Min 3 charachters') 
            document.getElementById('addTagBtn').disabled = true
        }
        else {
            setErrorMessage('ok!');
            document.getElementById('addTagBtn').disabled = false
        }
    },[newTag])

    return (
        <>
        <Modal title="#tags management" closeModal={closeModal}>
            <div className={styles.container}>
                <div className={styles.newTagBlock}>
                    <input 
                        type='text'
                        className={styles.newTagInput}
                        onChange={(e)=>setNewTag(e.target.value.slice(0.20))}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') addNewTag();
                            if (e.key === 'Escape') { e.stopPropagation(); setNewTag('') };
                        }} 
                        value={newTag}
                        maxLength={20}
                        placeholder='enter tag name without #'
                        
                    />
                    <button onClick={addNewTag} disabled={!canClick} id='addTagBtn'>+Add Tag</button>
                    <span className={styles.newTagInfoSpan}>{errorMessage}</span>
                    <hr />
                </div>

                { tags.map(t => {
                    let taskNumber = tasks.filter(task => task.tags.includes(t.id)).length
                        return (
                            <div>  
                            <div className={styles.tagRaw}>  
                                    {(showBlock.showButton || showBlock.id != t.id ) && (
                                        <div className={styles.tagNameButtonBlock}>
                                            <span>#{t.name}</span>
                                            <button onClick={()=>toggleBlocks(t.id, t.name)} className={styles.renameBtn} title="Rename tag">
                                                <i className="fa-solid fa-pencil fa-sm"></i>
                                            </button>
                                        </div>
                                    )}

                                    {(!showBlock.showButton && showBlock.id == t.id ) && (
                                        <div className={styles.tagNameInputBlock}>
                                        <input 
                                            type='text' 
                                            onChange={(e)=>setTagNewName(e.target.value)} 
                                            autoFocus 
                                            value={ tagNewName}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') renameTag(t.id);
                                                if (e.key === 'Escape') {
                                                    e.stopPropagation();  
                                                    setShowBlock(prev => ({...prev, showButton: true, showInput: false, showConfirme: false, id: null}))};
                                            }} 
                                        /> 
                                        <button onClick={()=>renameTag(t.id)} title="save changes">✓</button>
                                        {/* <div className={styles.errorMessageArea}>{errorMessage}</div> */}
                                        </div>
                                    )}
                                    <div className={styles.delBtnAndTasksNumber}>
                                        <span className={styles.tasksNumberSpan}>{ taskNumber === 1 ? taskNumber +' task' : taskNumber + ' tasks'}</span>
                                        {(!showBlock.showConfirme || showBlock.id !== t.id ) && (
                                        <button onClick={()=>deleteTag(t.id)}><i className="fa-solid fa-trash-can fa-lg"></i></button>
                                        )}
                                    </div>
                                    </div>  
                                    {(showBlock.showConfirme && showBlock.id == t.id ) && (
                                        <> 
                                            <div className={styles.deleteConfirmationBlock}>
                                                Delete <span className={styles.grayBg}>#{t.name}</span> affected { tasks.filter(task => task.tags.includes(t.id)).length} tasks. <br /> Want you realy delete this hashtag?
                                                <div className={styles.confirmationButtonsBlock}>
                                                    <button onClick={()=>cancelDeleteTag(t.id)} className={styles.cancelBtn} title='cancel delete'>Cancel</button>
                                                    <button onClick={()=>deleteTagWithTasks(t.id)} className={styles.deleteBtn} title='delete Tag'>Delete</button>
                                                </div>
                                            </div>
                                        </> 
                                    )}
                            </div>
                        )
                    })
                }
            </div>
        </Modal>
        </>
    )
}