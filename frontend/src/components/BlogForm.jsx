import React, { useContext } from "react";
import { Context } from "./helpers/Context";
import { Form, Field } from "react-final-form";
import { useParams, useNavigate } from "react-router-dom";

function BlogForm(props) {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  let { restaurantId } = useParams();
  const onSubmit = (values) => {
    if (!props.isEdit) {
      actions.newBlog(values.title, values.subtitle, values.body, restaurantId);
    } else {
      actions.editBlog(
        values.title,
        values.subtitle,
        values.body,
        props.blogId
      );
    }
    navigate(`/restaurants`);
  };
  return (
    <div>
      {!props.isEdit ? (
        <h1 className="text-center text-7xl">Add new blog</h1>
      ) : (
        <h1 className="text-center text-7xl">Edit Blog</h1>
      )}
      <Form
        onSubmit={onSubmit}
        initialValues={{
          title: props.title,
          subtitle: props.subtitle,
          body: props.body,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Required";
          }
          if (!values.subtitle) {
            errors.subtitle = "Required";
          }
          if (!values.body) {
            errors.body = "Required";
          }
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field name="title">
              {({ input, meta }) => (
                <div className="form-margin-top">
                  {/* <label>Title</label> */}
                  <input {...input} type="text" placeholder="Title" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="subtitle">
              {({ input, meta }) => (
                <div className="form-margin-top">
                  {/* <label>Subtitle</label> */}
                  <input {...input} type="text" placeholder="Subtitle" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className="note">
              <Field name="body" component="textarea">
                {({ input, meta }) => (
                  <div className="form-margin-top">
                    {/* <label>Body</label> */}
                    <textarea {...input} placeholder="Body" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>
            <div className="btn-group my-10 flex items-center justify-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
                className="btn btn-ghost ml-5"
              >
                Reset
              </button>
            </div>
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      />
    </div>
  );
}

export default BlogForm;
