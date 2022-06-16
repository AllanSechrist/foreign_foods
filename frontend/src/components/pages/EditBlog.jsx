import React, { useState, useEffect } from 'react'
import BlogForm from '../BlogForm'
import { useParams } from 'react-router-dom'
import axios from 'axios'


function EditBlog() {
    // let { blogId } = useParams()

    // const [blogToEdit, setBlogToEdit] = useState()
    // const fetchBlog = async () => {
    //     try {
    //         const data = await axios.get(`http://localhost:5000/blog/edit-blog/${blogId}`)
    //         const { blog } = data.data
    //         setBlogToEdit(blog)
    //         console.log(blogToEdit.body)
    //     } catch(error) {
    //         console.log(error)
    //     }
        
    // }

    // useEffect(() => {
    //     fetchBlog()
    // }, [])

    return (
        <BlogForm 
            isEdit={true}
            title=""
            subtitle=""
            body=""
        />
    )
}

export default EditBlog
