import React from 'react'
import BlogForm from '../BlogForm'

function NewBlog() {
    return (
        <BlogForm 
            isEdit={false}
            title=""
            subtitle=""
            body=""
        />    
    )
}

export default NewBlog
