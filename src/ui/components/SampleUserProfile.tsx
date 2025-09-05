"use client";
/*
 * Documentation:
 * SampleUserProfile — https://app.subframe.com/6b68d96d3e29/library?component=SampleUserProfile_b502ad6d-8be1-4649-82d8-d5868c60319f
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface SampleUserProfileRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  avatar?: React.ReactNode;
  name?: React.ReactNode;
  title?: React.ReactNode;
  sref?: React.ReactNode;
  sv?: React.ReactNode;
  className?: string;
}

const SampleUserProfileRoot = React.forwardRef<
  HTMLDivElement,
  SampleUserProfileRootProps
>(function SampleUserProfileRoot(
  {
    avatar,
    name,
    title,
    sref,
    sv,
    className,
    ...otherProps
  }: SampleUserProfileRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-full w-full max-w-[448px] flex-col items-center justify-center gap-8",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {avatar ? (
        <div className="flex flex-col items-center justify-center gap-8">
          {avatar}
        </div>
      ) : null}
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {name ? (
            <span className="text-body-bold font-body-bold text-white">
              {name}
            </span>
          ) : null}
          <span className="text-body font-body text-white">–</span>
          {title ? (
            <span className="text-body font-body text-white">{title}</span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-heading-4 font-heading-4 text-white text-center">
            --SREF
          </span>
          {sref ? (
            <span className="text-heading-4 font-heading-4 text-white text-center">
              {sref}
            </span>
          ) : null}
          <span className="text-heading-4 font-heading-4 text-white text-center">
            --SV
          </span>
          {sv ? (
            <span className="text-heading-4 font-heading-4 text-white text-center">
              {sv}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export const SampleUserProfile = SampleUserProfileRoot;
