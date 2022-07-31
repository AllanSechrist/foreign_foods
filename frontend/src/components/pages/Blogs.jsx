import React, { useContext, useEffect } from "react";
import { Context } from "../helpers/Context";
import BlogCard from "../BlogCard";

function Blogs() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getBlogs();
  }, []);

  return (
    <div>
      {store.blogs.map((blog) => {
        return <BlogCard key={blog.id} blog={blog} />;
      })}
    </div>
  );
}

export default Blogs;
