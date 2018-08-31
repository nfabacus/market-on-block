import React from 'react'

const InputSection = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  return (
    <div>
      <input className={`form-control ${touched[field.name] && errors[field.name]?"border-danger":""}`}  {...field} {...props} />
      { touched[field.name] && errors[field.name] && <div className="text-danger">{errors[field.name]}</div> }
    </div>
  )
}

export default InputSection