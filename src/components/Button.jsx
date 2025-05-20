import React from "react";

function Button({
  children,
  variant,
  size = "md",
  className = "",
  onClick,
  type = "button",
  ...props
}) {
  const baseStyle =
    "rounded-md font-medium transition-all duration-300 ease-in-out focus:outline-none";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-500/90",
    outline: "border border-gray-300 text-black hover:bg-gray-200",
  };

  const sizes = {
    sm: "p-2 text-sm",
    md: "px-4 py-2 text-base"
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;