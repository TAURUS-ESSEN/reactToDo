import { useAppContext } from '../../context/AppContext';
import { useState, useEffect } from 'react';
import styles from './tags.module.css';

export default function Tags() {
    const { filters, setFilters, tags} = useAppContext();
    const [tagChips, setTagChips] = useState([])

    function resetCurrentFilter(value) {
        setFilters(prev=>({...prev, tags: prev.tags.filter(t => t!== Number(value))}))
        setTagChips(prev=>(prev.filter(t=>t.id!==Number(value))))
    }

    useEffect(() => {
        if (filters.tags.length > 0) {
            filters.tags.map(id => {
                let currentTag = tags.find(t=> t.id === id)
                console.log('currentTag', currentTag)
                if (!tagChips.includes(currentTag))
                setTagChips(prev => [...prev, currentTag])
            })
        }
        else (setTagChips([]))
    },[filters.tags])

    return (
        <>   
        <div className={styles.chipsBlock}>
            {tagChips.map(t => {
                    return (
                        <>
                            <span className={styles.chipName}>
                                {/* {DEFAULT[c] ?? String(c)} */}
                                #{t.name}
                                <button 
                                    onClick={(e) => resetCurrentFilter(e.target.value)} 
                                    value={t.id} 
                                    className={styles.deleteChipBtn}
                                >
                                    x
                                </button>
                            </span>
                        </>
                    )
            })}
        </div>
        </>
    )
}