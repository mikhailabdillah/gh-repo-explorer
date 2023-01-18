import React, { ButtonHTMLAttributes, JSXElementConstructor } from 'react'
import s from './Button.module.css'
import cn from 'clsx'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component?: string | JSXElementConstructor<any>
}

const Button: React.FC<ButtonProps> = ({
  className,
  Component = 'button',
  children,
  ...rest
}) => {
  const baseClassName = cn(s.root, className)

  return (
    <Component className={baseClassName} {...rest}>
      {children}
    </Component>
  )
}

export default Button
