"use client";
/*
 * Documentation:
 * TagContainer — https://app.subframe.com/6b68d96d3e29/library?component=TagContainer_8c5a1990-a565-4ff7-94eb-0343bc6ab75a
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface TagContainerRootProps extends React.HTMLAttributes<HTMLDivElement> {
  tags?: React.ReactNode;
  className?: string;
}

const TagContainerRoot = React.forwardRef<
  HTMLDivElement,
  TagContainerRootProps
>(function TagContainerRoot(
  { tags, className, ...otherProps }: TagContainerRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-full w-72 flex-wrap items-start gap-2 rounded-t-lg bg-neutral-border px-2 py-2",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {tags ? (
        <div className="flex grow shrink-0 basis-0 flex-wrap items-start gap-2">
          {tags}
        </div>
      ) : null}
    </div>
  );
});

export const TagContainer = TagContainerRoot;
