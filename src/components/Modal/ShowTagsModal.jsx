import {useState} from 'react'
import Modal from "./Modal"
export default function ShowTagsModal({tags, tasks, closeModal}) {
    const [tagNewName, setTagNewName] = useState('')
    const [showBlock, setShowBlock] = useState({
        showButton: true,
        showInput: false,
        id: null,
    })

    function toggleBlocks(id) {
        // setShowBlock(prev => ({...prev, showButton: !prev.showButton , showInput: prev.showInput, id:id}))
        setShowBlock(prev => ({...prev, showButton: false, showInput: true, id:id}))
    }

    return (
        <>
        <Modal title="#tags management" closeModal={closeModal}>
            <div>
                {
                    tags.map(t => {
                        return (
                            <div>  
                                {(showBlock.showButton || showBlock.id != t.id ) && (
                                    <button onClick={()=>toggleBlocks(t.id)}>#{t.name}</button>
                                )}
                                {(!showBlock.showButton && showBlock.id == t.id ) && (
                                    <input type='text' onChange={(e)=>setTagNewName(e.target.value)} autoFocus value={tagNewName === '' ? t.name : tagNewName}/>
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