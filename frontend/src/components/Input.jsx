import React from 'react'

const Input = ({className, name, placeholder, labelText, fieldValue, onChange}) => {
  return (
    <div>
        {labelText && <label htmlFor={name}>{labelText}</label>}
        <input id={name} name={name} value={fieldValue}  className={className} placeholder={placeholder} onChange={onChange}/>
    </div>
  )
}

export default Input