import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../redux/auth/auth.actions';
import { register } from '../../redux/auth/auth.actions';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {ReactComponent as Logo} from "../../assets/LogoGlyphMd.svg";

import './AuthForm.styles.scss';

const AuthForm = ({ register, login, action }) => {
    const [ formData, setFormData ] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const Schema = Yup.object().shape({
        username: Yup.string()
            .email("Invalid email")
            .required("Email is required"),  
        password: Yup.string()
            .required('No password provided.') 
            .min(6, 'Password is too short')
      });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        // e.preventDefault();
        if (action === 'Sign up') {
            register({ username, password });
        } else {
            login({ username, password });
        }
    };

    const signUpLink = (
        <Fragment>
            Already have an account? <Link to='/login' name='login'>Log in</Link>
        </Fragment>
    );

    const logInLink = (
        <Fragment>
            Don't have an account? <Link to='/register' name='register'>Sign up</Link>
        </Fragment>
    );

    return (
        <>
        <div>
            <div className='icon-holder'>
                <Logo className='icon'/>
            </div>
            <div className='form-container'>
            <Formik
                initialValues={{
                    password: "",
                    username: ""
                }}
                // validationSchema={Schema}
                onSubmit={e => onSubmit(e)}
            >
                {() => { return (
                    <Form className='login-form'>
                        <div>
                            <label className='form-label s-label fc-black-600'>Username</label>
                            <Field
                                className='form-input s-input'
                                type='email'
                                name='username'
                                value={username}
                                onChange={e => onChange(e)}
                                id='username'
                                required
                                />
                            <ErrorMessage name="username" component="div" style={{ 'color': 'red' }} />
                        </div>
                        <div>
                            <label className='form-label s-label fc-black-600'>Password</label>
                            <Field
                                className='form-input s-input'
                                type='password'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                                id='password'
                                required
                                />
                            <ErrorMessage name="password" component="div" style={{ 'color': 'red' }} />
                        </div>
                        <div className='grid gs4 gsy fd-column js-auth-item '>
                            <button className='s-btn s-btn__primary' id='submit-button' type="submit" name='submit-button'>{action}</button>
                        </div>
                    </Form>
                )}}
            </Formik>
                <div className='fs-caption license fc-black-500'>
                    By clicking “{action}”, you agree to our <Link to='https://stackoverflow.com/legal/terms-of-service/public' className='-link'>
                    terms of service</Link>, <Link to='https://stackoverflow.com/legal/privacy-policy' name='privacy' className='-link'>
                    privacy policy</Link> and <Link to='https://stackoverflow.com/legal/cookie-policy' className='-link'>cookie policy</Link>
                    <input type='hidden' name='legalLinksShown' value='1'/>
                </div>
            </div>
            <div className='redirects fc-black-500'>
                {action === 'Sign up' ? signUpLink : logInLink}
                <div>
                    Are you an employer? <Link to='https://careers.stackoverflow.com/employer/login' name='talent'>Sign up on Talent <svg aria-hidden='true' className='svg-icon va-text-bottom sm-d-none icon-share-sm' width='14' height='14' viewBox='0 0 14 14'><path d='M5 1H3a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V9h-2v2H3V3h2V1z'/><path d='M7 1h6v6h-2V4.5L6.5 9 5 7.5 9.5 3H7V1z'/></svg></Link>
                </div>
            </div>
        </div>
    </>
    );
}

AuthForm.propTypes = {
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login, register })(AuthForm);