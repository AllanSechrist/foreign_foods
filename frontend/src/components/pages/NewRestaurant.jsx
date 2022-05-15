import React from 'react'
import { render } from 'react-dom'
import { Form, Field} from 'react-final-form'


const onSubmit = async values => {
    window.alert(JSON.stringify(values, 0, 2))
}

function NewRestaurant() {
    return (
        <div>
            <h1>Add new restaurant</h1>
            <Form
                onSubmit={onSubmit}
                validate={values => {
                    const errors = {}
                    if (!values.restaurantname) {
                        errors.restaurantname = 'Required'
                    }
                    if (!values.style) {
                        errors.style = 'Required'
                    }
                    if (!values.confirm) {
                        errors.confirm = 'Required'
                    }
                    return errors
                }}
                render={({ handleSubmit, form, submitting, pristine, values}) => (
                    <form onSubmit={handleSubmit}>
                        <Field name='restaurantname'>
                            {({ input, meta}) => (
                                <div>
                                    <label>Restaurant Name</label>
                                    <input {...input} type='text' placeholder="Restaurant Name" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name='style'>
                            {({ input, meta}) => (
                                <div>
                                    <label>Style</label>
                                    <input {...input} type='text' placeholder='Style' />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                    </form>
                )}
            />
        </div>
        
    )
}

export default NewRestaurant
