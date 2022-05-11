import React from 'react'

function BlogCard(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            <h3>{props.subtitle}</h3>
            <p>{props.date}</p>
            <p>{props.body}</p>
        </div>
    )
}

export default BlogCard
