import React, { useContext, useEffect } from "react";
import { Context } from "../helpers/Context";
import BlogCard from "../BlogCard";

function Blogs() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getBlogs();
  }, []);

  return (
    <div className="mt-10 p-10">
      {store.blogs.map((blog) => {
        return (
          <div className='mb-10'>
            <BlogCard key={blog.id} blog={blog} />
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
}

export default Blogs;
