import React, { useEffect, useContext } from "react";
import { Context } from "../helpers/Context";
import { useParams } from "react-router-dom";
import BlogCard from "../BlogCard";

function Blog() {
  let { restaurantId } = useParams();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getBlog(restaurantId);
  }, []);
  if (store.blog === null) {
    return (
      <div className="text-center m-10">
        <h1 className="text-8xl font-bold">Blog Coming Soon!</h1>
      </div>
    );
  }

  return (
    <div>
      {/* Hey! Its blog number { blogToShow.id } */}
      {store.blog.map((blog) => {
        return <BlogCard key={blog.id} blog={blog} />;
      })}

      {/* <button onClick={() => {actions.deleteBlog(null)}}>Delete Blog</button> */}
      {/* <button onClick={() => {setEditMode(true)}}>Edit Blog</button> */}
    </div>
  );
}

export default Blog;
