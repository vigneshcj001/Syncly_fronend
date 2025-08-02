import React from "react";
import { cn } from "../../lib/utils.jsx";

export const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "bg-zinc-900 text-white rounded-xl border border-zinc-700 shadow-lg",
      className
    )}
    {...props}
  />
);

export const CardContent = ({ className, ...props }) => (
  <div className={cn("w-full", className)} {...props} />
);
