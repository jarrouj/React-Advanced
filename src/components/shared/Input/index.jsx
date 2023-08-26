import classNames from "classnames";
import { forwardRef } from "react";



export const Input = forwardRef(({classes,disabled,error,...props},ref)=>{
    return (
        <input 
        ref={ref}
        className={classNames(`flex px-4 py-2 rounded-md border text-sm focus:outline-none ${classes}`,{"border-blue-500 focus:border-blue-500 placeholder:text-blue-500": !error},{"  border-red-500 focus:border-red-500 placeholder:text-red-500": error})}
        {...props}
        disabled={disabled}
        />
    )
});