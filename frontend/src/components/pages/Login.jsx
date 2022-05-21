import React, { useState } from 'react'
import axios from 'axios'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'



// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// const onSubmit = async values => {
//     await sleep(300)
//     if(values.username !== "Rein") {
//         return { username: "Unknown Username"}
//     }
//     if(values.password !== 'password') {
//         return { [FORM_ERROR]: 'Incorrect password'}
//     }
//     window.alert('LOGIN SUCCESS!')
// }

const onSubmit = async values => {
    await axios.post("http://localhost:5000/login", {
        "email": values.username,
        "password": values.password
    })
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error)
    })
}

function Login() {

    return (
        <div>
            <h1>LOGIN</h1>
            <h2>Welcome Back!</h2>
            <Form
                onSubmit={onSubmit}
                validate={values => {
                    const errors = {}
                    if (!values.username) {
                        errors.username = 'Required'
                    }
                    if (!values.password) {
                        errors.password = 'Required'
                    }
                    return errors
                 }}
                 render ={({
                     submitError,
                     handleSubmit,
                     form,
                     submitting,
                     pristine,
                     values
                 }) => (
                     <form onSubmit={handleSubmit}>
                         <Field name='username'>
                             {({ input, meta }) => (
                                 <div>
                                     <label>Username</label>
                                     <input {...input} type="text" placeholder="Username" />
                                     {(meta.error || meta.submitError) && meta.touched && (
                                         <span>{meta.error || meta.submitError}</span>
                                     )}
                                 </div>
                             )}
                         </Field>
                         <Field name="password">
                             {({ input, meta }) =>(
                                 <div>
                                     <label>Password</label>
                                     <input {...input} type="password" placeholder="Password" />
                                     {meta.error && meta.touched && <span>{meta.error}</span>}
                                 </div>
                            )}
                         </Field>
                         {submitError && <div className="error">{submitError}</div>}
                         <div className='buttons'>
                             <button type="submit" disabled={submitting}>
                                 Log In
                             </button>
                             <button
                                type="button"
                                onClick={form.reset}
                                disabled={submitting || pristine}
                                >
                                Reset
                             </button>
                         </div>
                         <pre>{JSON.stringify(values, 0, 2)}</pre>
                     </form>
                 )}>

            </Form>
        </div>
    )
}

export default Login
