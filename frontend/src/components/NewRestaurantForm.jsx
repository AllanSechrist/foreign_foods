import React, { useContext } from "react";
import { Form, Field } from "react-final-form";
import { Context } from "./helpers/Context";
import { useNavigate } from "react-router-dom";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// const onSubmit = async values => {
//     await sleep(300)
//     window.alert(JSON.stringify(values, 0, 2))
// }

const hours = Array.from(new Array(12), (x, i) => i + 1);
const ampm = ["AM", "PM"];
const minutes = ["00", "15", "30", "45"];
const foodRating = ["✘", "😋", "😋😋", "😋😋😋", "😋😋😋😋", "😋😋😋😋😋"];
const price = ["💸", "💸💸", "💸💸💸", "💸💸💸💸", "💸💸💸💸💸"];
const service = ["👍", "👍👍", "👍👍👍", "👍👍👍👍", "👍👍👍👍👍"];

function NewRestaurantForm() {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const onSubmit = (values) => {
    console.log("CLICKED");
    const openTime = `${values.openHour.toString()}:${values.openMinutes.toString()} ${
      values.openAmpm
    }`;
    const closeTime = `${values.closeHour.toString()}:${values.closeMinutes.toString()} ${
      values.closeAmpm
    }`;
    actions.newRestaurant(
      values.restaurantname,
      values.style,
      values.website,
      values.location,
      openTime,
      closeTime,
      values.food_rating,
      values.price,
      values.service
    );
    navigate("/restaurants");
  };
  return (
    <div>
      <h1 className="text-center text-6xl mb-10">Add New Restaurant</h1>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.restaurantname) {
            errors.restaurantname = "Required";
          }
          if (!values.style) {
            errors.style = "Required";
          }
          if (!values.website) {
            errors.website = "Required";
          }
          if (!values.location) {
            errors.location = "Required";
          }
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field name="restaurantname">
              {({ input, meta }) => (
                <div>
                  {/* <label>Restaurant Name</label> */}
                  <input {...input} type="text" placeholder="Restaurant Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="style">
              {({ input, meta }) => (
                <div>
                  {/* <label>Style</label> */}
                  <input {...input} type="text" placeholder="Style" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="website">
              {({ input, meta }) => (
                <div>
                  {/* <label>Website</label> */}
                  <input {...input} type="text" placeholder="Website" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="location">
              {({ input, meta }) => (
                <div>
                  {/* <label>Location</label> */}
                  <input {...input} type="text" placeholder="Location" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className='form-margin-top'>
              <label className="mx-1"><b>Open Hour: </b></label>
              <Field name="openHour" component="select">
                <option value="">N/A</option>
                {hours.map((hour) => {
                  return <option value={hour}>{hour}</option>;
                })}
              </Field>
              <label className="mx-1"><b>Minutes: </b></label>
              <Field name="openMinutes" component="select">
                <option value="">N/A</option>
                {minutes.map((minute) => {
                  return <option value={minute}>{minute}</option>;
                })}
              </Field>
              <label className="mx-1"><b>AMPM: </b></label>
              <Field name="openAmpm" component="select">
                <option value="">N/A</option>
                {ampm.map((option) => {
                  return <option value={option}>{option}</option>;
                })}
              </Field>
            </div>
            <div className='form-margin-top'>
              <label className="mx-1"><b>Close Hour: </b></label>
              <Field name="closeHour" component="select">
                <option value="">N/A</option>
                {hours.map((hour) => {
                  return <option value={hour}>{hour}</option>;
                })}
              </Field>
              <label className="mx-1"><b>Minutes: </b></label>
              <Field name="closeMinutes" component="select">
                <option value="">N/A</option>
                {minutes.map((minute) => {
                  return <option value={minute}>{minute}</option>;
                })}
              </Field>
              <label className="mx-1"><b>AMPM: </b></label>
              <Field name="closeAmpm" component="select">
                <option value="">N/A</option>
                {ampm.map((option) => {
                  return <option value={option}>{option}</option>;
                })}
              </Field>
            </div>
            <div className='form-margin-top'>
              <label className="mx-1"><b>Food Rating: </b></label>
              <Field name="food_rating" component="select">
                <option value="">N/A</option>
                {foodRating.map((rating) => {
                  return <option value={rating}>{rating}</option>;
                })}
              </Field>
            </div>
            <div className='form-margin-top'>
              <label className="mx-1"><b>Price: </b></label>
              <Field name="price" component="select">
                <option value="">N/A</option>
                {price.map((rating) => {
                  return <option value={rating}>{rating}</option>;
                })}
              </Field>
            </div>
            <div className='form-margin-top'>
              <label className="mx-1"><b>Service: </b></label>
              <Field name="service" component="select">
                <option value="">N/A</option>
                {service.map((rating) => {
                  return <option value={rating}>{rating}</option>;
                })}
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

export default NewRestaurantForm;
