const Selector = ({name, list, setStateMethod}) => {

    const handleChange = (e) => {
        setStateMethod(e.target.value)
    }

    return (
        list
        ? (<select className="w-1/3" onChange={handleChange}>
            <option>{name}</option>
            {list.map((option) => {
                return <option key={option}>{option}</option>
            })}
        </select>)
        : <select>No {name.toLowerCase()} available</select>
    )
}

export default Selector;