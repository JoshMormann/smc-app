"use client";
/*
 * Documentation:
 * StyleReferenceGallery — https://app.subframe.com/library?component=StyleReferenceGallery_777d7078-611c-44bb-9b2a-c311d2abac05
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface StyleReferenceGalleryRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  cards?: React.ReactNode;
  tags?: React.ReactNode;
  tagsVisible?: boolean;
  className?: string;
}

const StyleReferenceGalleryRoot = React.forwardRef<
  HTMLDivElement,
  StyleReferenceGalleryRootProps
>(function StyleReferenceGalleryRoot(
  {
    cards,
    tags,
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
      {cards ? (
        <div className="grow shrink-0 basis-0 items-start gap-4 self-stretch rounded-t-lg bg-neutral-border px-3 pt-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {cards}
        </div>
      ) : null}
      <div
        className={SubframeUtils.twClassNames(
          "hidden w-72 flex-none flex-wrap items-start gap-2 self-stretch rounded-t-lg bg-neutral-border px-2 py-2",
          { flex: tagsVisible }
        )}
      >
        {tags ? (
          <div className="flex grow shrink-0 basis-0 flex-wrap items-start gap-2">
            {tags}
          </div>
        ) : null}
      </div>
    </div>
  );
});

export const StyleReferenceGallery = StyleReferenceGalleryRoot;
