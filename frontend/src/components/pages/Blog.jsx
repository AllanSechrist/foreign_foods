import React, { useState, useEffect, useContext} from 'react'
import { Context } from '../helpers/Context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"
import BlogCard from '../BlogCard'
import EditBlog from './EditBlog'


function Blog() {
  
    // let navigate = useNavigate()
    const { actions } = useContext(Context)
    let { restaurantId } = useParams()

    const navigate = useNavigate()
    const [isEditMode, setEditMode] = useState(false)
    const [blogToShow, setBlogToShow] = useState([])

    const fetchBlogs = async () => {
      const data = await axios.get(`http://localhost:5000/blog/${restaurantId}`)
      const { blog } = data.data
      setBlogToShow(blog)
    
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  if (!isEditMode) {
    return (
      <div>
          {/* Hey! Its blog number { blogToShow.id } */}
          {blogToShow.map((blog) => {
            return (
            <BlogCard 
              key={blog.id}
              id={blog.id}
              title={blog.title}
              subtitle={blog.subtitle}
              date={blog.date}
              body={blog.body}
            />
            )
          })}
          
          {/* <button onClick={() => {actions.deleteBlog(null)}}>Delete Blog</button> */}
          <button onClick={() => {setEditMode(true)}}>Edit Blog</button>
         
         
      </div>
    )
  } else {
    return (
      <div>
        {blogToShow.map((blog) => {
          return (
            <EditBlog 
              key={blog.id}
              id={blog.id}
              title={blog.title}
              subtitle={blog.subtitle}
              body={blog.body}
            />
          )
        })}
      </div>
    )
    
  }
   
}

export default Blog
