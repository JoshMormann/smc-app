"use client";
/*
 * Documentation:
 * MainNavigation — https://app.subframe.com/6b68d96d3e29/library?component=MainNavigation_43685770-d0c2-4fb4-9e95-6c4897670e42
 * MainSearch — https://app.subframe.com/6b68d96d3e29/library?component=MainSearch_c11e91ce-745d-48ea-8823-03d553dc4c28
 */

import React from "react";
import { FeatherSearch } from "@subframe/core";
import * as SubframeUtils from "../utils";
import { MainSearch } from "./MainSearch";

interface MainNavigationRootProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: string;
  breadcrumbs?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const MainNavigationRoot = React.forwardRef<
  HTMLDivElement,
  MainNavigationRootProps
>(function MainNavigationRoot(
  {
    logo,
    breadcrumbs,
    actions,
    className,
    ...otherProps
  }: MainNavigationRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full items-center justify-between px-6 py-4",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex items-center gap-6">
        {logo ? (
          <img className="h-8 w-8 flex-none object-cover" src={logo} />
        ) : null}
        {breadcrumbs ? (
          <div className="items-center gap-6 hidden lg:flex xl:flex 2xl:flex sm:hidden md:hidden">
            {breadcrumbs}
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-center gap-4 pl-5 grow">
        <MainSearch
          className="h-auto grow shrink-0 basis-0"
          disabled={false}
          error={false}
          variant="filled"
          label=""
          helpText=""
          icon={<FeatherSearch />}
        >
          <MainSearch.Input placeholder="Search SREF Codes..." />
        </MainSearch>
        {actions ? (
          <div className="flex items-center justify-center gap-4">
            {actions}
          </div>
        ) : null}
      </div>
    </div>
  );
});

export const MainNavigation = MainNavigationRoot;
