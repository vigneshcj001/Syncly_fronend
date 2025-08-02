import React from "react";
import { cn } from "../../lib/utils.jsx";

export const Input = ({ className, ...props }) => (
  <input
    className={cn(
      "flex h-10 w-full rounded-md border border-zinc-700 bg-transparent px-3 py-2 text-white placeholder:text-zinc-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-primary",
      className
    )}
    {...props}
  />
);
