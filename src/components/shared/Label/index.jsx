import { forwardRef } from "react";


export const Label = forwardRef(({classes,...props},ref)=>{
    return (
        <label 
        ref={ref}
        {...props}     
        >

        </label>
    )
})