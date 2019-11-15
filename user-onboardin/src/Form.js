
import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginForm({ values, errors, touched, status }) {

    const [state, setState] = useState("200");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

  return (
      <div>
      <Form >
      <Field type="text" name="username" placeholder="Username" />
      {touched.username && errors.username && (
              <p className="errors">{errors.username}</p>
          )}
      <Field type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && (
              <p className="errors">{errors.password}</p>
          )}
      <Field type="email" name="email" placeholder="email" />
          {touched.email && errors.email && (
              <p className="errors">{errors.email}</p>
          )}
      <label className="checkbox-container">
          Terms of Service
          <Field
            type="checkbox"
            name="service"
            checked={values.service}
          />
        </label>
        <h3>status : {state}</h3>
      <button type="submit">Submit</button>
    </Form>
    {users.map((user, index) => (
        <div key={index}> 
        <h2>{user.username}</h2>
        <h2>{user.email}</h2>
        </div>
    ))}
    </div>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ username, password, email, service }) {
    return {
      username: username || "",
      password: password || "",
      email: email || "",
      service: service || false,
    };
  },

   validationSchema: Yup.object().shape({
       username: Yup.string()
            .min(6)
           .required(),
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be 6 characters or longer")
            .required("Password is required")
    }),

    handleSubmit(values, { setStatus }) {
        // values is our object with all our data on it
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                setStatus(res.data);
                console.log(res);
            })
            .catch(err => console.log(err.response));
    }
})(LoginForm);

export default FormikLoginForm;