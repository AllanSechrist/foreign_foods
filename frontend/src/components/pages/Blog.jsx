import React, { useEffect,  useState } from "react";
import { useParams } from "react-router-dom";
import BlogCard from "../BlogCard";
import axios from "axios";

function Blog() {
  let { restaurantId } = useParams();
  const [blogToShow, setBlogToShow] = useState([])

  const getBlog = async () => {
    const data = await axios.get(`http://localhost:5000/blog/${restaurantId}`)
    const { blog } = data.data;
    setBlogToShow(blog)
    console.log(blogToShow)
  }

  useEffect(() => {
    getBlog()
  }, []);
  if (blogToShow.length < 1) {
    return (
      <div className="text-center m-10">
        <h1 className="text-8xl font-bold">Blog Coming Soon!</h1>
      </div>
    );
  }

  return (
    <div>
      {/* Hey! Its blog number { blogToShow.id } */}
      {blogToShow.map((blog) => {
        return <BlogCard key={blog.id} blog={blog} />;
      })}

      {/* <button onClick={() => {actions.deleteBlog(null)}}>Delete Blog</button> */}
      {/* <button onClick={() => {setEditMode(true)}}>Edit Blog</button> */}
    </div>
  );
}

export default Blog;
