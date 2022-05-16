import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import img from '../styles/pages/logo/login.svg';

function Registration() {

  let navigate = useNavigate();

  const initialValues = {
    username:"",
    email:"",
    password:"",
    visitor:"visitor"
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(20).required(),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(4).max(20).required()
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:4000/auth", data).then(() => {
      console.log(data);
      navigate("/login");
    })
  };

  return (
    <div className='registrationContainer'>

      <div className="imgLogin">
        <img src={img} alt="" />
      </div>

      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit} 
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
            <label>Pseudo:</label>
            <ErrorMessage name='username' component="span"/>
            <Field
              autocomplete="off" 
              id="inputCreatePost" 
              name="username" 
              placeholder="Ex. luffy456..." >       
            </Field>

            <label>Email:</label>
            <ErrorMessage name='email' component="span"/>
            <Field
              autocomplete="off" 
              id="inputCreatePost"
              name="email" 
              placeholder="Ex. losPolosHermanos@gmail.com..." >       
            </Field>

            <label>Mot de passe:</label>
            <ErrorMessage name='password' component="span"/>
            <Field
              autocomplete="off"
              type="password" 
              id="inputCreatePost" 
              name="password" 
              placeholder="Ex. Votre mot de passe..." >       
            </Field>

            <button type='submit'> S'inscrire</button>
        </Form>
      </Formik>
     
    </div>)
}

export default Registration;