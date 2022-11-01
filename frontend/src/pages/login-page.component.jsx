import React, { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/auth.slice';

const LoginPage = () =>{

    // State
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    // REDUX
    const dispatch = useDispatch();
    const {
        user,
        isError,
        isSuccess,
        isLoading,
        message
    } = useSelector((state) => state.auth);


    // EVENT HANDLERS //////////////////////////////////////////
    const handleChange = ev => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [ev.target.name]: ev.target.value
            }
        })
    }

    const handleSubmit = ev => {
        ev.preventDefault();

        const userData = {
            email,
            password
        }

        dispatch(login(userData));

    }

 
    return(
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please login with your account</p>
            </section>

            <section className='form'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input className='form-control'
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                            required />
                    </div>
                    <div className='form-group'>
                        <input className='form-control'
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                            required />
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}


export default LoginPage;