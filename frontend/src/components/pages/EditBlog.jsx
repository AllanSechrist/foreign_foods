import React, {useEffect, useContext } from "react";
import {Context} from '../helpers/Context'
import { useParams } from "react-router-dom";
import BlogForm from "../BlogForm";

function EditBlog() {
  let { blogId } = useParams();
	const { store, actions } = useContext(Context)

	useEffect(() => {
		actions.getBlogToEdit(blogId)
	}, [])

  return (
		<BlogForm
      isEdit={true}
      blogId={store.blogToEdit.id}
      title={store.blogToEdit.title}
      subtitle={store.blogToEdit.subtitle}
      body={store.blogToEdit.body}
    />
  );
}

export default EditBlog;
