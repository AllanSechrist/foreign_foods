import React from 'react'
import BlogForm from '../BlogForm'



function EditBlog(props) {
    return (
        <BlogForm 
            isEdit={true}
            title={props.title}
            subtitle={props.subtitle}
            body={props.body}
        />
    )
}

export default EditBlog
