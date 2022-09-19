import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../helpers/Context";
import BlogForm from "../BlogForm";
import axios from "axios";

function EditBlog() {
  let { blogId } = useParams();
  const [blogToEdit, setBlogToEdit] = useState([]);
  const { store } = useContext(Context);
  const opts = {
    headers: {
      Authorization: "Bearer " + store.token,
    },
  };

  const getBlogToEdit = async () => {
    const data = await axios.get(
      `http://localhost:5000/blog/edit-blog/${blogId}`, opts
    );
    const { blog } = data.data;
    setBlogToEdit(blog);
  };

  useEffect(() => {
    getBlogToEdit();
  }, []);

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
