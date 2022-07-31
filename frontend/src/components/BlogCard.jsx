import React, { useContext, useState } from "react";
import { Context } from "./helpers/Context";
import EditBlog from "./pages/EditBlog";

function createMarkup(markup) {
  return { __html: markup };
}

function BlogCard({
  blog: {id, title, subtitle, date, body}
}) {
  const { actions } = useContext(Context);
  const [isEditMode, setEditMode] = useState(false);
  if (!isEditMode) {
    return (
      <div className="text-left">
        <h1 className="text-6xl">{title}</h1>
        <h3 className="text-4xl py-5">{subtitle}</h3>
        <p className="pb-5">{date}</p>
        <p
          className="text-2xl"
          dangerouslySetInnerHTML={createMarkup(body)}
        />
        <div className="my-5 text-right">
          <button
            className="btn btn-outline btn-error"
            onClick={() => {
              actions.deleteBlog(id);
            }}
          >
            Delete Blog
          </button>
          <button
            className="btn btn-primary mx-5"
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit Blog
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <EditBlog
        key={id}
        id={id}
        title={title}
        subtitle={subtitle}
        body={body}
      />
    );
  }
}

export default BlogCard;
