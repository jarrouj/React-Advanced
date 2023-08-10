import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 

import { UserContext } from '../../context/User';
import { useContext } from 'react';

export const SignIn = () =>{

    const {setUser}=useContext(UserContext);

    const {handleSubmit , register , formState:{erros}}= useForm({
        resolver : yupResolver(signInSchema),
    })

    const onSubmit=()=>{

    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='email'>Email</label>
                <input {...register('email')} type='email' id='email'/>

                <label htmlFor='password'>Password</label>
                <input {...register('passsword')} type='password' id='password' />
            </form>


        </div>
    )
}