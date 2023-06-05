import React from "react"

const Selector = ({name, list, setStateMethod}) => {

    const handleChange = (e) => {
        setStateMethod(e.target.value)
    }

    return (
        list
        ? (<select className="w-full min-w-fit rounded-sm" onChange={handleChange}>
            <option value={""}>{name}</option>
            {list.map((option) => {
                return <option key={option}>{option}</option>
            })}
        </select>)
        : <select>No {name.toLowerCase()} available</select>
    )
}

export default Selector;