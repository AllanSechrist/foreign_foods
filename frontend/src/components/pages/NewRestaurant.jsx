import React from 'react'
import { Form, Field} from 'react-final-form'


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
}

const hours = Array.from(new Array(12), (x ,i) => i + 1)
const ampm = ["AM", "PM"]
const minutes = ['00', '15', '30', '45']
const foodRating = [('✘'), ('😋'), ('😋😋'), ('😋😋😋'), ('😋😋😋😋'), ('😋😋😋😋😋')]
const price = [('💸'), ('💸💸'), ('💸💸💸'), ('💸💸💸💸'), ('💸💸💸💸💸')]
const service = [('👍'), ('👍👍'), ('👍👍👍'), ('👍👍👍👍'), ('👍👍👍👍👍')]


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
                    if (!values.website) {
                        errors.website = 'Required'
                    }
                    if (!values.location) {
                        errors.location = 'Required'
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
                        <Field name="website">
                            {({ input, meta}) => (
                                <div>
                                    <label>Website</label>
                                    <input {...input} type='text' placeholder='Website' />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="location">
                            {({ input, meta}) => (
                                <div>
                                    <label>Location</label>
                                    <input {...input} type='text' placeholder='Location' />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <div>
                            <label>Open Hour</label>
                            <Field name="open" component="select">
                                    <option />
                                    {hours.map((hour) => {
                                        return(
                                            <option value={hour}>{hour}</option>
                                        )
                                    })}
                            </Field>
                            <label>Minutes</label>
                            <Field name="minutes" component="select">
                                <option />
                                {minutes.map((minute) => {
                                    return(
                                        <option value={minute}>{minute}</option>
                                    )
                                })}
                            </Field>
                            <label>AMPM</label>
                            <Field name="ampm" component="select">
                                <option />
                                {ampm.map((option) => {
                                    return (
                                        <option value={option}>{option}</option>
                                    )
                                })}
                            </Field>
                        </div>
                        <div>
                            <label>Food Rating</label>
                            <Field name="food rating" component="select">
                                <option />
                                {foodRating.map((rating) => {
                                    return (
                                        <option value={rating}>{rating}</option>
                                    )
                                })}
                            </Field>
                        </div>
                        <div>
                            <label>Price</label>
                            <Field name="price" component="select">
                                <option />
                                {price.map((rating) => {
                                    return (
                                        <option value={rating}>{rating}</option>
                                    )
                                })}
                            </Field>
                        </div>
                        <div>
                            <label>Service</label>
                            <Field name="service" component="select">
                                <option />
                                {service.map((rating) => {
                                    return (
                                        <option value={rating}>{rating}</option>
                                    )
                                })}
                            </Field>
                        </div>
                        
                        <button type="submit">
                                Submit
                        </button>
                        <button 
                            type="button"
                            onClick={form.reset}
                            disabled={submitting || pristine}
                        >
                            Reset
                        </button>
                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                    </form>
                )}
            />
        </div>
        
    )
}

export default NewRestaurant
