"use client";
/*
 * Documentation:
 * ActionBar — https://app.subframe.com/6b68d96d3e29/library?component=ActionBar_42519152-fea5-4944-9ab1-0420c034e2cf
 * Avatar — https://app.subframe.com/6b68d96d3e29/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 * Button — https://app.subframe.com/6b68d96d3e29/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Dropdown Menu — https://app.subframe.com/6b68d96d3e29/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 * MainNavigation — https://app.subframe.com/6b68d96d3e29/library?component=MainNavigation_43685770-d0c2-4fb4-9e95-6c4897670e42
 * MainSearch — https://app.subframe.com/6b68d96d3e29/library?component=MainSearch_c11e91ce-745d-48ea-8823-03d553dc4c28
 */

import React from "react";
import { FeatherEdit2 } from "@subframe/core";
import { FeatherPlus } from "@subframe/core";
import { FeatherSearch } from "@subframe/core";
import { FeatherStar } from "@subframe/core";
import { FeatherTrash } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";
import { ActionBar } from "./ActionBar";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { DropdownMenu } from "./DropdownMenu";
import { MainSearch } from "./MainSearch";

interface MainNavigationRootProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: string;
  authenticated?: boolean;
  breadcrumbs?: React.ReactNode;
  className?: string;
}

const MainNavigationRoot = React.forwardRef<
  HTMLDivElement,
  MainNavigationRootProps
>(function MainNavigationRoot(
  {
    logo,
    authenticated = false,
    breadcrumbs,
    className,
    ...otherProps
  }: MainNavigationRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/43685770 flex w-full items-center justify-between px-6 py-4",
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
        <ActionBar
          actions={
            <>
              <div className="flex items-center gap-2">
                <Button
                  className="h-12 w-auto flex-none"
                  variant="neutral-secondary"
                  size="large"
                >
                  Log In
                </Button>
                <Button className="h-12 w-auto flex-none" size="large">
                  Get Started
                </Button>
              </div>
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <div className="hidden items-center gap-2">
                    <Button
                      className="hidden h-12 w-auto flex-none"
                      size="large"
                    >
                      Get Started
                    </Button>
                    <Avatar
                      className="hidden"
                      variant="brand"
                      size="medium"
                      image="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif"
                      square={false}
                    >
                      A
                    </Avatar>
                    <FeatherPlus className="hidden text-body font-body text-default-font" />
                  </div>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <DropdownMenu.DropdownItem icon={<FeatherStar />}>
                        Favorite
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon={<FeatherPlus />}>
                        Add
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon={<FeatherEdit2 />}>
                        Edit
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon={<FeatherTrash />}>
                        Delete
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
            </>
          }
          authenticated={authenticated ? true : undefined}
        />
      </div>
    </div>
  );
});

export const MainNavigation = MainNavigationRoot;
