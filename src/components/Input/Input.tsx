import React, { InputHTMLAttributes } from 'react'
import s from './Input.module.css'
import cn from 'clsx'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Input: React.FC<InputProps> = ({ className, ...rest }) => {
  const baseClassName = cn(s.root, className)

  return <input type='text' className={baseClassName} {...rest} />
}

export default Input
