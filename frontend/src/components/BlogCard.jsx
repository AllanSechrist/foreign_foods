import React, { useContext } from 'react'
import { Context } from './helpers/Context'

function createMarkup(markup) {
    return {__html: markup}
}

function BlogCard(props) {
    const { actions } = useContext(Context)
    return (
        <div>
            <h1>{props.title}</h1>
            <h3>{props.subtitle}</h3>
            <p>{props.date}</p>
            <p dangerouslySetInnerHTML={createMarkup(props.body)} />
            <button onClick={() => {actions.deleteBlog(props.id)}}>Delete Blog</button>
        </div>
    )
}

export default BlogCard
