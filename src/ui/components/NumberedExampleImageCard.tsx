"use client";
/*
 * Documentation:
 * NumberedExampleImageCard — https://app.subframe.com/6b68d96d3e29/library?component=NumberedExampleImageCard_d784f170-a3ac-4c53-a107-296bc4da0a79
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface NumberedExampleImageCardRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  number?: React.ReactNode;
  className?: string;
}

const NumberedExampleImageCardRoot = React.forwardRef<
  HTMLDivElement,
  NumberedExampleImageCardRootProps
>(function NumberedExampleImageCardRoot(
  { number, className, ...otherProps }: NumberedExampleImageCardRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-28 w-28 items-start gap-2 overflow-hidden rounded-md bg-neutral-50 relative",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex h-8 w-8 flex-none items-start justify-center gap-2 rounded-sm border border-solid border-neutral-border bg-default-background px-1 py-1 absolute right-1 top-1">
        {number ? (
          <span className="text-heading-3 font-heading-3 text-subtext-color">
            {number}
          </span>
        ) : null}
      </div>
    </div>
  );
});

export const NumberedExampleImageCard = NumberedExampleImageCardRoot;
