import { createPortal } from "react-dom"
import  styles  from './toast.module.css'
import {useState, useEffect} from 'react'
import { useAppContext } from "../../context/AppContext"

export default function Toast() {
    const toastRoot = document.getElementById('root-toast')
    const {toasts, setToasts} = useAppContext()
    useEffect(() => {
        if (toasts.length === 0) return
        const timer = setTimeout(() => {
           setToasts(prev => prev.slice(1)); // удаляем первый тост
        }, 3000);
        return () => clearTimeout(timer)
    }, [toasts])
    
    return createPortal(
        <>  
            {toasts.length > 0 && (
                <div id='toastContainer' className={`${styles.stack} ${toasts.length > 0 ? styles.show : ''}`}>
                {toasts.map((t, i) => (
                        <div className={styles.toast} key={i}>
                        {/* поддержим и строки, и JSX-узлы */}
                        {t?.message ?? t}
                        </div>
                    ))}
                </div>
            )}
        </>
    , toastRoot)
}