import React, { useState, useEffect, useContext} from 'react'
import { Context } from '../helpers/Context'
import axios from 'axios'
import { useParams } from "react-router-dom"
import BlogCard from '../BlogCard'


function Blog() {
  
    // let navigate = useNavigate()
    const { actions } = useContext(Context)
    let { blogId } = useParams()

    const [blogToShow, setBlogToShow] = useState([])

    const fetchBlogs = async () => {
    const data = await axios.get(`http://localhost:5000/blog/${blogId}`)
    const { blog } = data.data
    setBlogToShow(blog)
    // console.log(blog)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

    return (
        <div>
            Hey! Its blog number { blogId }
            {blogToShow.map((blog) => {
              return (
              <BlogCard 
                key={blog.id}
                title={blog.title}
                subtitle={blog.subtitle}
                date={blog.date}
                body={blog.body}
              />
              )
            })}
            <button onClick={() => {actions.deleteBlog(blogId)}}>Delete Blog</button>
           
        </div>
    )
}

export default Blog
