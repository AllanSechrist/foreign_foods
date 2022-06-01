import React from 'react'

function createMarkup(markup) {
    return {__html: markup}
}

function BlogCard(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            <h3>{props.subtitle}</h3>
            <p>{props.date}</p>
            <p dangerouslySetInnerHTML={createMarkup(props.body)} />

        </div>
    )
}

export default BlogCard
