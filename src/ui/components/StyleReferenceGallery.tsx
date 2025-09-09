"use client";
/*
 * Documentation:
 * CardGrid — https://app.subframe.com/6b68d96d3e29/library?component=CardGrid_0173b531-32fb-44c0-aa9c-b28c03ea3fed
 * StyleReferenceGallery — https://app.subframe.com/6b68d96d3e29/library?component=StyleReferenceGallery_777d7078-611c-44bb-9b2a-c311d2abac05
 * TagContainer — https://app.subframe.com/6b68d96d3e29/library?component=TagContainer_8c5a1990-a565-4ff7-94eb-0343bc6ab75a
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { CardGrid } from "./CardGrid";
import { TagContainer } from "./TagContainer";

interface StyleReferenceGalleryRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tagsVisible?: boolean;
  className?: string;
}

const StyleReferenceGalleryRoot = React.forwardRef<
  HTMLDivElement,
  StyleReferenceGalleryRootProps
>(function StyleReferenceGalleryRoot(
  {
    tagsVisible = false,
    className,
    ...otherProps
  }: StyleReferenceGalleryRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/777d7078 flex h-full w-full items-start gap-5 transition ease-in-out duration-700",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <CardGrid />
      <TagContainer
        className={SubframeUtils.twClassNames("hidden", { flex: tagsVisible })}
      />
    </div>
  );
});

export const StyleReferenceGallery = StyleReferenceGalleryRoot;
