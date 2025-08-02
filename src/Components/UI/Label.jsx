import React from "react";

export const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-medium text-white mb-1"
  >
    {children}
  </label>
);
