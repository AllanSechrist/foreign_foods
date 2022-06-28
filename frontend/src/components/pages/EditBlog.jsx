import React from 'react'
import BlogForm from '../BlogForm'


function EditBlog(props) {
    return (
        <BlogForm 
            isEdit={true}
            blogId={props.id}
            title={props.title}
            subtitle={props.subtitle}
            body={props.body}
        />
    )
}

export default EditBlog
