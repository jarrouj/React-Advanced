import { forwardRef } from "react";


export const Errors = forwardRef(({...props},ref)=>{

    return (
        <p
        ref={ref}
        {...props}  
        className="text-red-500"></p>
    )
})