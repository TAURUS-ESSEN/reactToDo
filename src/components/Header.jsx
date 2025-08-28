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
                <option value='all'>Choose category</option>
                {categories.map(c=>{
                    return <option value={c.id}>{c.name}</option>
                })}
            </select>
            {filters.status} {filters.category}
        </div>
        </>
    )
}