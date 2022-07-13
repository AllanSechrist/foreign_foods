import React, { useContext, useState } from "react";
import { Context } from "./helpers/Context";
import EditBlog from "./pages/EditBlog";

function createMarkup(markup) {
  return { __html: markup };
}

function BlogCard(props) {
  const { actions } = useContext(Context);
  const [isEditMode, setEditMode] = useState(false);
  if (!isEditMode) {
    return (
      <div className="text-left">
        <h1 className="text-6xl">{props.title}</h1>
        <h3 className="text-4xl py-5">{props.subtitle}</h3>
        <p className="pb-5">{props.date}</p>
        <p
          className="text-2xl"
          dangerouslySetInnerHTML={createMarkup(props.body)}
        />
        <div className="my-5 text-right">
          <button
            className="btn btn-secondary"
            onClick={() => {
              actions.deleteBlog(props.id);
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
        key={props.id}
        id={props.id}
        title={props.title}
        subtitle={props.subtitle}
        body={props.body}
      />
    );
  }
}

export default BlogCard;
