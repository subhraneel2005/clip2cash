"use client";

import { cn } from "../../lib/utils";
import React from "react";

interface DotPatternProps {
  className?: string;
  // Keeping some of the original particle props for compatibility
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

const DotPattern: React.FC<DotPatternProps> = ({
  className,
  // We're not using these props anymore, but keeping them in the interface
  // for backward compatibility
  quantity,
  staticity,
  ease,
  size,
  refresh,
  color,
  vx,
  vy,
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 h-full w-full select-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]",
        className
      )}
      aria-hidden="true"
    />
  );
};

export default DotPattern;
