const DEFAULT_FILTERS = {
    status: 'all',
    category: 'all',
    period: 'all',
    search: '',
    priority: 'all',
    dueDate: 'all'
}

export default function Header({filters, categories, setFilters, openModal}) {
    const canReset = ()=> Object.entries(DEFAULT_FILTERS).some(([k,v])=>filters[k]!==v)
 

    function resetAllFilters() {
        const checkbox = document.getElementById('checkAll')
        checkbox.checked = false;
        setFilters({ ...DEFAULT_FILTERS}); 
    console.log('checkbox', checkbox)
    }

    return (
        <>
        <header>
            <select onChange={(e)=>setFilters(prev=>({...prev, status:  e.target.value}))} value={filters.status}>
                <option value='all'>All tasks</option>
                <option value='active'>Active</option>
                <option value='completed'>Completed</option>
            </select>
            <select onChange={(e)=>setFilters(prev=>({...prev, category:  e.target.value}))} value={filters.category}> 
                <option value='all'>All categories</option>
                <option value="0">No category</option>
                {categories.map(c=>{
                    return <option value={c.id} key={c.id}>{c.name.length > 15 ? c.name.slice(0,15)+'...' : c.name}</option>
                })}
            </select>
            <select onChange={(e)=>setFilters(prev=>({...prev, period:  e.target.value}))} value={filters.period}>
                <option value='all'>All time</option>
                <option value='today'>Today</option>
                <option value='week'>Week</option>
                <option value='overdue'>Overdue</option>
            </select>
            <select onChange={(e)=>{setFilters(prev=>({...prev, priority: e.target.value}))}} value={filters.priority}>
                <option value='all'>All priorities</option>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
            </select>
            <input 
                type='text' 
                onChange={(e)=>setFilters(prev=>({...prev, search: e.target.value}))} 
                value={filters.search} 
                placeholder="search by name"
                autoComplete="off"
            />
            {/* <button onClick={()=>{setFilters({ ...DEFAULT_FILTERS}); resetAllFilters() }}  */}
            <button onClick={()=>{resetAllFilters()}} 
                    title = 'Reset filters'
                    disabled={!canReset()} className="resetFiltersBtn">
                ↻
            </button>
            <button onClick={()=>openModal('addTask')} className='addNewBtn' title = 'Add new task'>New task</button>
            
        </header>
        </>
    )
}