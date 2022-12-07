import React from 'react'

export default function SingleBook({item, updateSelectedBook}) {

    const truncate = (text) => {
        //If the description length goes over 45, truncate it after 45 chars
        return text.length > 45 ? text.substring(0,45) + "..." : text
    }

    return (
        <div className="singleBook" onClick={() => updateSelectedBook(item)}>
                <h2>{item.title}</h2>
                <h3>👤 {item.author}</h3>
                <h3>📃 {truncate(item.description)}</h3>
        </div>
    )
}
