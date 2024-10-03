import React from 'react'

const Button = ({ children, onClick, className, type = 'button', style }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex justify-center rounded-md px-3 py-1.5 text-sm font-bold leading-6 ${className}`}
      style={style}
    >
      {children}
    </button>
  )
}

export default Button