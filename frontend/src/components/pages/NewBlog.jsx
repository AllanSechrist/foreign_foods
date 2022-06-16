import React from 'react'
import BlogForm from '../BlogForm'

function NewBlog() {
    return (
        <BlogForm 
            isEdit={false}
            title="Test"
            subtitle="Test"
            body="Test"
        />    
    )
}

export default NewBlog
