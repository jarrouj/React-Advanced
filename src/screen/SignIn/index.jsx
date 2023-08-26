import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 

import { UserContext } from '../../context/User';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInSchema } from '../../schemas';

export const SignIn=()=>{

    const {setUser}= useContext(UserContext);

    const navigate=useNavigate();

    const {handleSubmit, register, formState:{errors}}= useForm({
        resolver: yupResolver(signInSchema),
    })

    const onSubmit=(data)=>{
        setUser(data.email);
        navigate('home')
    }

    console.log("errors :" ,errors)

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='email'>Email</label>
            <input {...register('email')} type='email' id='email' />
            <p>{errors?.email?.message}</p>
            <label>Password</label>
            <input {...register('password')} type='password' id='password' />
            <p>{errors?.password?.message}</p>
            <button >Sign In</button>
        </form>
    </div>
}