export default function Header({filters, categories, setFilters}) {
    return (
        <>
        <div>
            <select onChange={(e)=>setFilters(prev=>({...prev, status:  e.target.value}))}>
                <option value='all'>All</option>
                <option value='active'>Active</option>
                <option value='completed'>Completed</option>
            </select>
            <select onChange={(e)=>setFilters(prev=>({...prev, category:  e.target.value}))}>
                <option value='all'>All categories</option>
                {categories.map(c=>{
                    return <option value={c.id}>{c.name}</option>
                })}
            </select>
            <select onChange={(e)=>setFilters(prev=>({...prev, period:  e.target.value}))}>
                <option value='all'>All</option>
                <option value='today'>Today</option>
                <option value='week'>Week</option>
                <option value='late'>to Late</option>
            </select>
            <input type='text' onChange={(e)=>setFilters(prev=>({...prev, search: e.target.value}))} value={filters.search}/>
            {filters.status} {filters.category} {filters.period} {filters.search}
        </div>
        </>
    )
}