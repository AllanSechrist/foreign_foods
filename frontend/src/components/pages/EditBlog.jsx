import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogForm from "../BlogForm";
import axios from "axios";

function EditBlog() {
  let { blogId } = useParams();
  const [blogToEdit, setBlogToEdit] = useState([]);

  // useEffect(() => {
  //   actions.getBlogToEdit(blogId);
  // }, []);

  const getBlogToEdit = async () => {
    const data = await axios.get(`http://localhost:5000/blog/get-blog/${blogId}`)
    const { blog } = data.data
    setBlogToEdit(blog)
  }

  useEffect(() => {
    getBlogToEdit()
  }, [])

  return (
    <BlogForm
      isEdit={true}
      blogId={blogToEdit.id}
      title={blogToEdit.title}
      subtitle={blogToEdit.subtitle}
      body={blogToEdit.body}
    />
  );
}

export default EditBlog;
