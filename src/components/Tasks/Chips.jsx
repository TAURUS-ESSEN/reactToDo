import {useOutletContext} from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './tasks.module.css';

export default function Chips() {

    const {categories, filters, setFilters} = useOutletContext();
    const [chips, setChips] = useState([])
    const category = categories.find(c => c.id === Number(filters.category))

    const DEFAULT = {
        status: `Status: ${filters.status}`,
        category: `Category: ${category?.name ?? 'No category' }`,
        period: `Time: ${filters.period}`,
        search: `Search word: ${filters.search.slice(0,15)} ${filters.search.length>15?'...': ''}`,
        priority: `Priority: ${filters.priority}`,
        dueDate: `due Date: ${pretty(filters.dueDate)}`,
        tags: `#$tags`
    }

    function resetCurrentFilter(value) {
        value === 'search'
        ? setFilters(prev=>({...prev, [value]: ''}))
        : setFilters(prev=>({...prev, [value]: 'all'}))
    }

    function pretty(dueDate) {
        if (!dueDate) return '-';
            const [y,m,d] = dueDate.split('-');
        return `${d}.${m}.${y}`;
    }

    useEffect(() => {
        for (let key in filters) {
            if (filters[key] !== 'all' && filters[key] !== '' && key !== 'tags' ) {
                if (!chips.includes(key)) {
                    setChips(prev => ([...prev, key]))
                }
            }
            else  setChips(prev => prev.filter(c => c !== key))
        }
    },[filters])

    return (
    <>    
 
    <div className={styles.chipsBlock}>
        {chips.map(c => {
                return (
                    <>
                        <span className={styles.chipName}>
                            {DEFAULT[c] ?? String(c)}
                            <button 
                                onClick={(e) => resetCurrentFilter(e.target.value)} 
                                value={c} 
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