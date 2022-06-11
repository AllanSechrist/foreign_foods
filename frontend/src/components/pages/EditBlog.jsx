import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../helpers/Context'
import {Form, Field} from 'react-final-form'
import { useParams } from 'react-router-dom'
import axios from 'axios'


function EditBlog() {
    const { actions } = useContext(Context)
    let { blogId } = useParams()

    const [blogToEdit, setBlogToEdit] = useState()
    const fetchBlog = async () => {
        const data = await axios.get(`http://localhost:5000/blog/edit-blog/${blogId}`)
        const { blog } = data.data
        setBlogToEdit(blog)
        console.log(blogToEdit)
    }

    useEffect(() => {
        fetchBlog()
    }, [])

    const onSubmit = (values) => {
        actions.editBlog(values.title, values.subtitle, values.body, blogId)
    }
    return (
        <div>
            <h1>Edit Blog</h1>
            <Form 
                onSubmit={onSubmit}
                initialValues={{title: blogToEdit.title, subtitle: blogToEdit.subtitle, body: blogToEdit.body}}
                validate = {values => {
                    const errors = {}
                    if(!values.title) {
                        errors.title = "Required"
                    }
                    if(!values.subtitle) {
                        errors.subtitle = "Required"
                    }
                    if(!values.body) {
                        errors.body = "Required"
                    }
                    return errors
                    
                }}
                render={({ handleSubmit, form, submitting, pristine, values}) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="title">
                            {({ input, meta}) => (
                                <div>
                                    <label>Title</label>
                                    <input {...input} type="text" placeholder="Title" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="subtitle">
                            {({ input, meta}) =>(
                                <div>
                                    <label>Subtitle</label>
                                    <input {...input} type="text" placeholder="Subtitle" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="body" component="textarea">
                            {({ input, meta}) => (
                                <div>
                                    <label>Body</label>
                                    <textarea {...input} placeholder="Body" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <button type="submit">
                            Submit
                        </button>
                        <button type="button" onClick={form.reset} disabled={submitting || pristine}>
                            Reset
                        </button>
                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                    </form>
                )}
            />

            
        </div>
        
    )
}

export default EditBlog
