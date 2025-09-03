"use client";
/*
 * Documentation:
 * SideBarNavigation — https://app.subframe.com/library?component=SideBarNavigation_e1273795-e8c1-47d5-a826-a160607ca537
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface SideBarNavigationRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  mainActions?: React.ReactNode;
  bottomAction?: React.ReactNode;
  className?: string;
}

const SideBarNavigationRoot = React.forwardRef<
  HTMLDivElement,
  SideBarNavigationRootProps
>(function SideBarNavigationRoot(
  {
    mainActions,
    bottomAction,
    className,
    ...otherProps
  }: SideBarNavigationRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-full items-center justify-between bg-default-background pb-5 fixed flex-row bottom-7 left-7 right-7 drop-shadow-md z-50 p-6 rounded md:relative md:flex-col md:bottom-0 md:left-0 md:right-0 md:drop-shadow-none md:p-0 md:pb-5 md:none",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {mainActions ? (
        <div className="flex items-center gap-6 flex-row md:flex-col">
          {mainActions}
        </div>
      ) : null}
      {bottomAction ? (
        <div className="flex flex-col items-center justify-between">
          {bottomAction}
        </div>
      ) : null}
    </div>
  );
});

export const SideBarNavigation = SideBarNavigationRoot;
