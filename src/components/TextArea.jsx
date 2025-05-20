import React from "react";

function TextArea({
  label,
  name,
  placeholder,
  value,
  onChange,
  rows = 10,
  required = false,
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={name} className="text-base font-medium text-charcoalBlack/70">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-charcoalBlack focus:border-deepBlue outline-none focus:ring-1 focus:ring-deepBlue transition-all duration-200"
        />
      </div>
    </>
  );
}

export default TextArea;