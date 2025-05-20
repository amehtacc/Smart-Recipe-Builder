import React from "react";

function Input({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = false,
  error,
  min,
  step,
  className = "",
}) {
  return (
    <>
      <div className={`flex flex-col gap-2 ${className}`}>
        {label && (
          <label htmlFor={name} className={`text-base font-medium text-black/70 ${error ? 'text-red-500': ''} transition-colors duration-200`}>
            {label} {error && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          min={min}
          step={step}
          className={`w-full px-3 py-2 text-black text-base border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent ${error ? 'border-red-500': ''} transition-all duration-200`}
        />
      </div>
    </>
  );
}

export default Input;