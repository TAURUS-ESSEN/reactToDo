import { createPortal } from "react-dom"
import  styles  from './toast.module.css'
import {useState, useEffect} from 'react'

export default function Toast({toasts, setToasts}) {
    const toastRoot = document.getElementById('root-toast')

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