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
      <div>
        <h1>{props.title}</h1>
        <h3>{props.subtitle}</h3>
        <p>{props.date}</p>
        <p dangerouslySetInnerHTML={createMarkup(props.body)} />
        <button
          onClick={() => {
            actions.deleteBlog(props.id);
          }}
        >
          Delete Blog
        </button>
        <button
          onClick={() => {
            setEditMode(true);
          }}
        >
          Edit Blog
        </button>
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
