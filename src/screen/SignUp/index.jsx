import { yupResolver } from "@hookform/resolvers/yup"
import { useContext } from "react";
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { UserContext } from "../../context/User";
import { Label } from "../../components/shared/Label";
import { Input } from "../../components/shared/Input"; 

const signupSchema=yup.object().shape({
    name: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), 'Passwords must match'], 'Passwords must match')
      .required('Confirm Password is required'),
    termsAndServices: yup.boolean().required(),
});

export const SignUp= () =>{
   const {setUser}=useContext(UserContext);




    const {formState:{errors},register,trigger,getValues,watch}=useForm({//setValues
        resolver:yupResolver(signupSchema)
    })

    const termsAndServices=watch('termsAndServices');

    const handleSignup = async() =>{
        const validated= await trigger();
        const data = getValues();

        console.log(data);
        if(validated) setUser(data.email)

    }

    return (
        <div>
            <Label htmlFor="name">Name</Label>
            <Input placeholder="Name" type="text" {...register("name")} />
            <p>{errors?.name?.message}</p>

            <Label htmlFor="email">Email</Label>
            <Input placeholder="Email" type="email" {...register("email")} error={false}/>
            <p>{errors?.email?.message}</p>


            <Label htmlFor="password">Password</Label>
            <Input placeholder="Password" type="password" {...register("password")}/>
            <p>{errors?.password?.message}</p>

            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input {...register("confirmPassword")} placeholder="Confirm Password" type="password" />
            <p>{errors?.confirmPassword?.message}</p>

       <Label>Accept Terms and Services</Label>
      <input {...register("termsAndServices")} type="checkbox"/>
       <button disabled={!termsAndServices} onClick={handleSignup}>Sign Up</button>
        </div>
    )
}