import React, { ComponentPropsWithRef, forwardRef, useId } from "react";

interface InputProps extends ComponentPropsWithRef<"input"> {
  errorMessage?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, label, ...rest }, ref) => {
    const id = useId();
    return (
      <>
        {!!label && <label htmlFor={id}>{label}</label>}
        <input id={id} ref={ref} {...rest} />
        {!!errorMessage && <span className="text-red-500">{errorMessage}</span>}
      </>
    );
  }
);
