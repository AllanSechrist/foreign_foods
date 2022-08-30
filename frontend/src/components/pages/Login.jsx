import React, { useContext } from "react";
import { Context } from "../helpers/Context";
import { useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
// import { FORM_ERROR } from 'final-form'

function Login() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const onSubmit = (values) => {
    actions.login(values.username, values.password);
  };

  if (store.token && store.token !== "" && store.token !== undefined)
    navigate("/");

  return (
    <div>
      <h1 className="text-center text-6xl mb-10">LOGIN</h1>
      <h2 className="text-center text-3xl">Welcome Back!</h2>
      {store.token && store.token !== "" && store.token !== undefined ? (
        "Logged In"
      ) : (
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Required";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          render={({
            submitError,
            handleSubmit,
            form,
            submitting,
            pristine,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Field name="username">
                {({ input, meta }) => (
                  <div className="form-margin-top">
                    {/* <label>Username</label> */}
                    <input {...input} type="text" placeholder="Username" />
                    {(meta.error || meta.submitError) && meta.touched && (
                      <span>{meta.error || meta.submitError}</span>
                    )}
                  </div>
                )}
              </Field>
              <Field name="password">
                {({ input, meta }) => (
                  <div className="form-margin-top">
                    {/* <label>Password</label> */}
                    <input {...input} type="password" placeholder="Password" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              {submitError && <div className="error">{submitError}</div>}
              <div className="btn-group my-10 flex items-center justify-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  Log In
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
        ></Form>
      )}
    </div>
  );
}

export default Login;
