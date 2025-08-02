import React from "react";
import { cn } from "../../lib/utils.jsx";

export const Button = ({ className, variant = "default", ...props }) => {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 h-10 px-4 py-2";

  const variants = {
    default: "bg-primary text-white hover:bg-primary/90",
    outline: "border border-zinc-600 text-white hover:bg-zinc-800",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
};
