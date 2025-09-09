"use client";
/*
 * Documentation:
 * CardGrid — https://app.subframe.com/6b68d96d3e29/library?component=CardGrid_0173b531-32fb-44c0-aa9c-b28c03ea3fed
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface CardGridRootProps extends React.HTMLAttributes<HTMLDivElement> {
  styleReferenceCards?: React.ReactNode;
  className?: string;
}

const CardGridRoot = React.forwardRef<HTMLDivElement, CardGridRootProps>(
  function CardGridRoot(
    { styleReferenceCards, className, ...otherProps }: CardGridRootProps,
    ref
  ) {
    return styleReferenceCards ? (
      <div
        className={SubframeUtils.twClassNames(
          "h-full w-full items-start gap-4 rounded-t-lg bg-neutral-border px-3 pt-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {styleReferenceCards}
      </div>
    ) : null;
  }
);

export const CardGrid = CardGridRoot;
