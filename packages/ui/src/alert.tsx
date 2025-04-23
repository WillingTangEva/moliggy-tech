"use client";

import { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  type?: "info" | "success" | "warning" | "error";
  className?: string;
}

export const Alert = ({ 
  children, 
  type = "info", 
  className = "" 
}: AlertProps) => {
  const baseStyles = "rounded-md p-4 mb-4";
  
  const typeStyles = {
    info: "bg-blue-50 text-blue-800 border border-blue-200",
    success: "bg-green-50 text-green-800 border border-green-200",
    warning: "bg-yellow-50 text-yellow-800 border border-yellow-200",
    error: "bg-red-50 text-red-800 border border-red-200"
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type]} ${className}`}>
      {children}
    </div>
  );
}; 