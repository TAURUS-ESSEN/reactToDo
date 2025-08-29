export default function Header({filters, categories, setFilters}) {
    // function resetFilters() {

    // }

    return (
        <>
        <header>
            <select onChange={(e)=>setFilters(prev=>({...prev, status:  e.target.value}))} value={filters.status}>
                <option value='all'>All Tasks</option>
                <option value='active'>Active</option>
                <option value='completed'>Completed</option>
            </select>
            <select onChange={(e)=>setFilters(prev=>({...prev, category:  e.target.value}))} value={filters.category}> 
                <option value='all'>All categories</option>
                {categories.map(c=>{
                    return <option value={c.id}>{c.name}</option>
                })}
            </select>
            <select onChange={(e)=>setFilters(prev=>({...prev, period:  e.target.value}))} value={filters.period}>
                <option value='all'>All time</option>
                <option value='today'>Today</option>
                <option value='week'>Week</option>
                <option value='late'>to Late</option>
            </select>
            <select onChange={(e)=>{setFilters(prev=>({...prev, priority: e.target.value}))}} value={filters.priority}>
                <option value='all' deselected>Priority</option>
                <option value='low'>Low</option>
                <option value='middle'>Middle</option>
                <option value='high'>High</option>
            </select>
            <input type='text' onChange={(e)=>setFilters(prev=>({...prev, search: e.target.value}))} value={filters.search} placeholder="search by name"/>
            {/* {filters.status} {filters.category} {filters.period} {filters.search} */}
            <button onClick={()=>setFilters({status: 'all', category: 'all', period: 'all', search: '', priority: ''})}>Reset Filters</button>
        </header>
        </>
    )
}