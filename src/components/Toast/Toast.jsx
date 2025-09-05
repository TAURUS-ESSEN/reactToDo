import { createPortal } from "react-dom"
import  styles  from './toast.module.css'
import {useState, useEffect} from 'react'

export default function Toast({toasts, setToasts}) {
    const toastRoot = document.getElementById('root-toast')

    useEffect(() => {
        if (toasts.length === 0) return
        const timer = setTimeout(() => {
            setToasts(prev => prev.filter((_, i) => i !== 0));
        }, 3000);
        return () => clearTimeout(timer)
    }, [toasts])
    
    return createPortal(
        <>  
            {toasts.length > 0 && (
                <div id='toastContainer' className={`${styles.toastContainer} ${toasts.length > 0 ? styles.show : ''}`}>
                    {toasts.map(t=>{
                        return <div>{t.message}</div>
                    })}
                </div>
            )}
        </>
    , toastRoot)
}