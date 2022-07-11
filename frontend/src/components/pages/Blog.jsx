import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"
import BlogCard from '../BlogCard'


function Blog() {

    let { restaurantId } = useParams()
    const [blogToShow, setBlogToShow] = useState([])

    const fetchBlogs = async () => {
      const data = await axios.get(`http://localhost:5000/blog/${restaurantId}`)
      const { blog } = data.data
      setBlogToShow(blog)
    
  }

  useEffect(() => {
    fetchBlogs()
  }, [])
  if (blogToShow.length < 1) {
    return (
      <div className="text-center m-10">
        <h1 className="text-8xl font-bold">Blog Coming Soon!</h1>
      </div>

    )
  }
  
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
        {/* <button onClick={() => {setEditMode(true)}}>Edit Blog</button> */}
       
       
    </div>
  )
  
   
}

export default Blog
