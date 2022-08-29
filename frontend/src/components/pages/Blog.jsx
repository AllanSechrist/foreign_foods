import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import BlogCard from "../BlogCard";
import axios from "axios";
import { Context } from "../helpers/Context";
import Spinner from "../Spinner";

function Blog() {
  let { restaurantId } = useParams();
  const { store } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [blogToShow, setBlogToShow] = useState([]);

  const getBlog = async () => {
    const data = await axios.get(`http://localhost:5000/blog/${restaurantId}`);
    const { blog } = data.data;
    setBlogToShow(blog);
    console.log(blogToShow);
  };

  useEffect(() => {
    getBlog();
    setLoading(false);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (blogToShow.length > 0) {
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
  return (
    <div className="flex items-center justify-center">
      {store.token && store.token !== "" && store.token !== undefined ? (
        <Link to={`/blog/new-blog/${restaurantId}`}>
          <button className="btn btn-lg">+ Add Blog</button>
        </Link>
      ) : (
        <h1 className='text-center text-7xl'>Blog Coming Soon!</h1>
      )}
    </div>
  );
}

export default Blog;
