import {createPortal} from 'react-dom';
import {useEffect} from 'react'
import styles from './modal.module.css';

export default function Modal({children, closeModal}) {
    const modalRoot = document.getElementById('root-modal');
    
    useEffect(()=>{
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => {if (e.key==='Escape') closeModal()};
        document.addEventListener("keydown", onKey)
        return () =>{ document.body.style.overflow = prev; document.removeEventListener("keydown", onKey)}
    },[closeModal]) 


    return createPortal(
        <>
        <div className={styles.overlay} onClick={(e)=> e.currentTarget===e.target && closeModal()}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
        </>
    , modalRoot)
}