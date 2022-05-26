import React, { useContext } from 'react'
import { Context } from '../helpers/Context'
import {Form, Field} from 'react-final-form'
import { useParams } from 'react-router-dom'

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// const onSubmit = async values => {
//     await sleep(300)
//     window.alert(JSON.stringify(values, 0, 2))
// }

// function createDate() {
//     const today = new Date()
//     const month = today.toLocaleDateString('defualt', { month: 'long'})
//     const day = today.getDate()
//     const year = today.getFullYear()
//     const fullDate = `${month} ${day} ${year}`
//     return fullDate
// }

function NewBlog() {
    const { actions } = useContext(Context)
    let { restaurantId } = useParams()
    const onSubmit = (values) => {
        actions.newBlog(values.title, values.subtitle, values.body, restaurantId)
    }
    return (
        <div>
            <h1>Add new blog</h1>
            <Form 
                onSubmit={onSubmit}
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
                                    <input {...input} placeholder="Body" />
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

export default NewBlog
