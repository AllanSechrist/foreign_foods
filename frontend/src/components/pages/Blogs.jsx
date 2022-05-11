import React, {useState, useEffect} from 'react'
import axios from "axios"
import BlogCard from '../BlogCard'

function Blogs() {
  const [blogList, setBlogList] = useState([])

  const fetchBlogs = async () => {
    const data = await axios.get("http://localhost:5000/blog")
    const {blog} = data.data
    setBlogList(blog)
    console.log(blog)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

    return (
        <div>
            {blogList.map((blog) => {
                return(
                    <BlogCard 
                        key={blog.id}
                        title={blog.title}
                        subtitle={blog.subtitle}
                        date={blog.date}
                        body={blog.body}
                    />
                )
            })}
        </div>
    )
}

export default Blogs
