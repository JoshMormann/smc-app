"use client";
/*
 * Documentation:
 * ActionBar — https://app.subframe.com/6b68d96d3e29/library?component=ActionBar_42519152-fea5-4944-9ab1-0420c034e2cf
 * Avatar — https://app.subframe.com/6b68d96d3e29/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 * Button — https://app.subframe.com/6b68d96d3e29/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Dropdown Menu — https://app.subframe.com/6b68d96d3e29/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 */

import React from "react";
import { FeatherChevronDown } from "@subframe/core";
import { FeatherEdit2 } from "@subframe/core";
import { FeatherLogOut } from "@subframe/core";
import { FeatherPlus } from "@subframe/core";
import { FeatherPlusCircle } from "@subframe/core";
import { FeatherSettings } from "@subframe/core";
import { FeatherStar } from "@subframe/core";
import { FeatherUser } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { DropdownMenu } from "./DropdownMenu";

interface ActionBarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  authenticated?: boolean;
  className?: string;
}

const ActionBarRoot = React.forwardRef<HTMLDivElement, ActionBarRootProps>(
  function ActionBarRoot(
    { authenticated = false, className, ...otherProps }: ActionBarRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/42519152 flex items-center gap-2 rounded-lg bg-neutral-border px-1 py-1",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div
          className={SubframeUtils.twClassNames("flex items-center gap-2", {
            hidden: authenticated,
          })}
        >
          <Button
            className={SubframeUtils.twClassNames("h-12 w-auto flex-none", {
              flex: authenticated,
            })}
            variant="neutral-secondary"
            size="large"
          >
            Log In
          </Button>
          <Button
            className={SubframeUtils.twClassNames("h-12 w-auto flex-none", {
              flex: authenticated,
            })}
            size="large"
          >
            Get Started
          </Button>
        </div>
        <div
          className={SubframeUtils.twClassNames("hidden items-center gap-2", {
            flex: authenticated,
          })}
        >
          <Button
            className={SubframeUtils.twClassNames(
              "hidden h-12 w-auto flex-none",
              { flex: authenticated }
            )}
            size="large"
            icon={authenticated ? <FeatherPlusCircle /> : undefined}
          >
            {authenticated ? "Add" : "Get Started"}
          </Button>
          <SubframeCore.DropdownMenu.Root>
            <SubframeCore.DropdownMenu.Trigger asChild={true}>
              <div
                className={SubframeUtils.twClassNames(
                  "hidden items-center gap-2",
                  { flex: authenticated }
                )}
              >
                <Avatar
                  className={SubframeUtils.twClassNames("hidden", {
                    flex: authenticated,
                  })}
                  variant="brand"
                  size={authenticated ? "large" : "medium"}
                  image="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif"
                  square={authenticated ? true : false}
                >
                  A
                </Avatar>
                {authenticated ? (
                  <FeatherChevronDown
                    className={SubframeUtils.twClassNames(
                      "hidden text-body font-body text-default-font",
                      { "inline-flex": authenticated }
                    )}
                  />
                ) : (
                  <FeatherPlus
                    className={SubframeUtils.twClassNames(
                      "hidden text-body font-body text-default-font",
                      { "inline-flex": authenticated }
                    )}
                  />
                )}
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
                  <DropdownMenu.DropdownItem
                    icon={authenticated ? <FeatherUser /> : <FeatherStar />}
                  >
                    {authenticated ? "Profile" : "Favorite"}
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem
                    icon={authenticated ? <FeatherSettings /> : <FeatherPlus />}
                  >
                    {authenticated ? "Account Settings" : "Add"}
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem
                    icon={authenticated ? <FeatherLogOut /> : <FeatherEdit2 />}
                  >
                    {authenticated ? "Log Out" : "Edit"}
                  </DropdownMenu.DropdownItem>
                </DropdownMenu>
              </SubframeCore.DropdownMenu.Content>
            </SubframeCore.DropdownMenu.Portal>
          </SubframeCore.DropdownMenu.Root>
        </div>
      </div>
    );
  }
);

export const ActionBar = ActionBarRoot;
