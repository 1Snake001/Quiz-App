import React from 'react'

const Radio = ({ className, name, value,checked, onChange,Ref }) => {

  return (
    <div className={className}>    
        <label key={name}>
          <input 
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            ref={Ref}
          />
        </label>
   
    </div>
  )
}

export default Radio;