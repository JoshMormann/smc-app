"use client";
/*
 * Documentation:
 * Search Detail — https://app.subframe.com/library?component=Search+Detail_92f3c4fc-f923-42f3-8d83-561c2144a012
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface SearchDetailRootProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const SearchDetailRoot = React.forwardRef<
  HTMLDivElement,
  SearchDetailRootProps
>(function SearchDetailRoot(
  { label, children, className, ...otherProps }: SearchDetailRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-wrap items-center gap-2",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {label ? (
        <span className="text-body-bold font-body-bold text-default-font">
          {label}
        </span>
      ) : null}
      {children ? (
        <div className="flex items-center gap-2">{children}</div>
      ) : null}
    </div>
  );
});

export const SearchDetail = SearchDetailRoot;
