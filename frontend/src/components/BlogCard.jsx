import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./helpers/Context";
import EditBlog from "./pages/EditBlog";


function createMarkup(markup) {
  return { __html: markup };
}

function BlogCard({ blog: { id, title, subtitle, date, body } }) {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div className="text-left">
      <h1 className="text-6xl">{title}</h1>
      <h3 className="text-4xl py-5">{subtitle}</h3>
      <p className="pb-5">{date}</p>
      <p className="text-2xl" dangerouslySetInnerHTML={createMarkup(body)} />
      <div className="my-5 text-right">
        {store.token && store.token !== "" && store.token !== undefined ? (
          <>
            <button
              className="btn btn-outline btn-error"
              onClick={() => {
                actions.deleteBlog(id); navigate("/")
              }}
            >
              Delete Blog
            </button>
            <Link to={`/blog/edit-blog/${id}`}>
              <button className="btn btn-secondary mx-5">Edit Blog</button>
            </Link>
          </>  
        ) : (<></>)}
      </div>
    </div>
  );
}

export default BlogCard;
