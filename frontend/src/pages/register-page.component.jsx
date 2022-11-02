import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

// React-redux
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/auth.slice';

const RegisterPage = () =>{

    // State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const navigate = useNavigate();
    const { name, email, password, password2 } = formData;

    // REDUX CODE ///////////////////////////////////////////////
    const dispatch = useDispatch();
    const { user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth);


    //////////////////////////////////////////////////////////////
    // Component lifecycle method
    useEffect(() => {
        if(isError){
            toast.error(message);
        }

        if(isSuccess || user){
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

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

        // Validation rules
        if(password !== password2){
            toast.error('Passwords does not match.')
        } else {
            const userData = {
                name, email, password
            }

            dispatch(register(userData));
        }
    }

    if(isLoading){
        return(
            <h1>Loading....</h1>
        )
    }
 
    return(
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input className='form-control'
                            type='text'
                            id='name'
                            name='name'
                            value={name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                            required />
                    </div>
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
                        <input className='form-control'
                            type='password'
                            id='password2'
                            name='password2'
                            value={password2}
                            onChange={handleChange}
                            placeholder='Confirm Password'
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


export default RegisterPage;